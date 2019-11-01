/**
 * The EntityManager is responsible for managing the lifecycle
 * of entities (creation, destruction) and notifying systems
 * of these events.
 *
 * @class EntityManager
 */

import * as EVENTS from '../events/Events'
import { Entity } from '../entities/Entity'
import { EventBus } from '../events/EventBus'
import { Event } from '../events/Event'
import { System } from './System'
import { uuid } from '../utils/uuid'

class EntityManager implements System {
  private entities: Map<String, Entity>
  private topics: Array<String>
  private bus: EventBus

  constructor(bus: EventBus) {
    this.entities = new Map<String, Entity>();
    this.topics = new Array<String>();
    this.bus = bus; 
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
        this.dispatchEvent(event);
      })
    })
  }

  /**
   * Handle an event from the event bus.
   *
   * @param {*} event TODO: define this class
   * @memberof EntityManager
   */
  dispatchEvent(event: Event) {
    if (event instanceof EVENTS.CreateEntityEvent)
      this.createEntity(event);
    else if (event instanceof EVENTS.DestroyEntityEvent)
      this.destroyEntity(event);
    else
      throw new Error('Invalid event: ' + JSON.stringify(event));
  }

  /**
   * Creates a new entity which essentially is a unique id which
   * it returns to the caller.
   * 
   * @memberof EntityManager
   */
  createEntity(event: EVENTS.CreateEntityEvent) {
    let id = uuid();
    let entity = new Entity(id);
    this.entities.set(entity.id, entity);
  }

  /**
   * Removes the entity specified by id from the list of registered
   * entities.
   * 
   * @memberof EntityManager
   */
  destroyEntity(event: EVENTS.DestroyEntityEvent) {
    // get entity id from event data
    let id = event.id;
    if (typeof this.entities.get(id) !== 'undefined') {
      this.entities.delete(id)
      // emit entity destroyed event
      let event =  new EVENTS.EntityDestroyedEvent();
      this.bus.publish(event);
    } 
    else
      throw new Error("Entity with id:" + id + " does not exist");
  }
  
}

export { EntityManager }