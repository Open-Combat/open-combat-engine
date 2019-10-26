/**
 * This is the main Engine class. The Engine is responsible
 * for running all of the game's systems.
 *
 * @class Engine
 */

import { EntityManager } from './systems/EntityManager.js'
// import { ComponentManager } from './systems/ComponentManager.js'
// import { SystemManager } from './systems/SystemManager.js'

class Engine {

  /**
   * Creates an instance of engine as well as all of its 
   * systems & managers.
   * 
   * @memberof Engine
   */
  constructor() {
    this.systems = {}
    this.systems.entityManager = new EntityManager();
    // this.systems.componentManager = new ComponentManager();
    // this.systems.systemManager = new SystemManager();
  }

  /**
   * This method starts the engine.
   * (load initial states, begin game loop)
   *
   * @memberof Engine
   */
  start() {
    console.log('Engine starting...');
    // load the initial world state?

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
    // this.systems.componentManager.run();
    // this.systems.systemManager.run();
  }
}

export { Engine }