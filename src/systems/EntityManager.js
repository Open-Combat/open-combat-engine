/**
 * The EntityManager is responsible for managing the lifecycle
 * of entities (creation, destruction).
 *
 * @class EntityManager
 */

import { uuid } from '../utils/uuid.js'
import { Event } from '../Event.js'

class EntityManager {
  constructor(bus) {
    console.log('Initializing EntityManager...');
    
    // create empty list of entities
    this.entities = {};

    // subscribe to relevant event topics
    this.bus = bus;
    this.topics = ['entity'];
    this.bus.subscribe(this.topics);

    console.log('Created EntityManager.');
  }

  /**
   * Called during each iteration of the gameloop.
   * 
   * @memberof EntityManager
   */
  run() {
    for (var topic in this.topics) {
      let events = this.bus.getEvents(this.topic);
      for (var event in events) {
        console.log('PROCESSING EVENT');
        this.processEvent(event);
        this.createEntity();
      }
    }
  }

  /**
   * Handle an event from the event bus.
   *
   * @param {*} event TODO: define this class
   * @memberof EntityManager
   */
  processEvent(event) {
    if (event.name === 'create')
      this.createEntity();
    else if (event.name === 'destroy')
      this.destroyEntity(event);
    else
      throw 'Invalid event name: ' + event.name
  }

  /**
   * Creates a new entity which essentially is a unique id which
   * it returns to the caller.
   * 
   * @memberof EntityManager
   */
  createEntity() {
    let id = uuid();
    if (typeof this.entities.id === 'undefined') {
      this.entities.id = id;
      // publish create entity event
      let event = new Event('entity', {id: id});
      this.bus.publish(event);
    }
    else
      throw new 'id:' + id + ' has already been generated';
  }

  /**
   * Removes the entity specified by id from the list of registered
   * entities.
   * 
   * @memberof EntityManager
   */
  destroyEntity(id) {
    if (typeof this.entities.id !== 'undefined') {
      delete this.entities.id
      // emit entity destroyed event
      let event = {name: 'entity', data: {id: id}};
      this.bus.publish(event);
    } else {
      // throw error?
      throw "Entity with id:" + id + " does not exist"
    }
  }
  
}

export { EntityManager }