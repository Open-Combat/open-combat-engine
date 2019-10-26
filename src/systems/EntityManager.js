/**
 * The EntityManager is responsible for managing the lifecycle
 * of entities (creation, destruction).
 *
 * @class EntityManager
 */

import { uuid } from '../utils/uuid.js'

class EntityManager {
  constructor() {
    // something...
    this.entities = {};
  }

  /**
   * Called during each iteration of the gameloop.
   * 
   * @memberof EntityManager
   */
  run() {
    // get all of the messages of the event bus
    // process them in order
    // think about this some more duh ugh
    this.createEntity();
    console.log(this.entities);
    this.destroyEntity(9);
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
      return id;
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
      return id
    } else {
      // throw error?
      throw "Entity with id:" + id + " does not exist"
    }
  }
  
}

export { EntityManager }