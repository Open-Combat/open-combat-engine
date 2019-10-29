/**
 * This is the main Engine class. The Engine is responsible
 * for running all of the game's systems in the game loop.
 *
 * @class Engine
 */

import { EventBus } from './events/EventBus.js'
import { EntityManager } from './systems/EntityManager.js'
// import { ComponentManager } from './systems/ComponentManager.js'
// import { SystemManager } from './systems/SystemManager.js'

class Engine {

  /**
   * Creates an instance of engine as well as all of its 
   * systems & the event bus.
   * 
   * @memberof Engine
   */
  constructor() {
    // intializing event bus
    this.bus = new EventBus();
    // intializing systems with reference to bus
    this.systems = {}
    this.systems.entityManager = new EntityManager(this.bus);
  }

  /**
   * This method starts the engine.
   * (load initial state, begin game loop)
   *
   * @memberof Engine
   */
  start() {
    setInterval( () => this.gameloop(), 500);
    console.log('Engine started.');
  }

  /**
   * This method is ran each frame. Systems are ran in a defined
   * order.
   * 
   * @memberof Engine
   */
  gameloop() {
    let start = performance.now();

    try {                                 // run all of the systems in order
      this.systems.entityManager.run();     
    } 
    catch (error) {
      console.log(error.stack);
    } 

    let end = performance.now(); 
    console.log('Ran gameloop in :' + (end-start).toFixed(3) + 'ms');
  }
}

export { Engine }