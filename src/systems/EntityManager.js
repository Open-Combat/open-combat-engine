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
    this.bus.register(this.topics);
    this.bus.subscribe(this.topics);

    console.log('Created EntityManager.');
  }

  /**
   * Called during each iteration of the gameloop.
   * 
   * @memberof EntityManager
   */
  run() {
    let events = this.bus.getEvents(this.topics);
    for (event in events) {
      this.processEvent(event);
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
    if (typeof this.entities.id !== 'undefined') {
      throw new 'id:' + id + ' has already been generated';
    } else {
      this.entities.id = id;
      // emit create entity event
      let event = new Event('entity-create', {id: id});
      this.bus.publish(event);
    }
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
      let event = {name: 'entity/destroyed', data: {id: id}};
      this.bus.publish(event);
    } else {
      // throw error?
      throw "Entity with id:" + id + " does not exist"
    }
  }
  
}

export { EntityManager }