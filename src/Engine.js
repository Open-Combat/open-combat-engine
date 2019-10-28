/**
 * This is the main Engine class. The Engine is responsible
 * for running all of the game's systems in the game loop.
 *
 * @class Engine
 */

import { EventBus } from './EventBus.js'
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
    console.log('Initializing Engine...');

    // intializing event bus
    this.bus = new EventBus();

    // intializing systems with reference to bus
    this.systems = {}
    this.systems.entityManager = new EntityManager(this.bus);
  }

  /**
   * This method starts the engine.
   * (load initial states, begin game loop)
   *
   * @memberof Engine
   */
  start() {
    console.log('Engine starting...');
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
    console.log('Ran gameloop');
    this.systems.entityManager.run();
  }
}

export { Engine }