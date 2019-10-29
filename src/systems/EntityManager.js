/**
 * The EntityManager is responsible for managing the lifecycle
 * of entities (creation, destruction) and notifying systems
 * of these events.
 *
 * @class EntityManager
 */

import { uuid } from '../utils/uuid.js'
import { Event } from '../events/Event.js'
import { EVENTS } from '../events/EVENTS.js'

class EntityManager {
  constructor(bus) {
    this.entities = {};
    this.bus = bus;
    this.topics = ['entity']; 
  }

  /**
   * Called during each iteration of the gameloop. Get all events 
   * from the event bus and process in order.
   * 
   * @memberof EntityManager
   */
  run() {
    console.log('EntityManager running...');
    this.topics.forEach(topic => {
      let events = this.bus.getEvents(topic);
      events.forEach(event => {
        this.processEvent(event);
      })
    })
  }

  /**
   * Handle an event from the event bus.
   *
   * @param {*} event TODO: define this class
   * @memberof EntityManager
   */
  processEvent(event) {
    if (event.topic === 'entity') {
      let data = event.data;
      console.log(JSON.stringify(data)); 
      if (data.action === "create")
        this.createEntity();
      if (data.action === 'destroy')
        this.destroyEntity(data);
      else
        throw new Error('Invalid event action: ' + data.action);
    }
    else
      throw new Error('Invalid event topic: ' + event.topic);
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
      throw new Error('id:' + id + ' has already been generated');
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
      throw new Error("Entity with id:" + id + " does not exist");
    }
  }
  
}

export { EntityManager }