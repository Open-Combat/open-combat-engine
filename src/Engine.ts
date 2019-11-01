/**
 * This is the main Engine class. The Engine is responsible
 * for running all of the game's systems in the game loop.
 *
 * @class Engine
 */

import { EventBus } from './events/EventBus'
import { System } from './systems/System'
import { EntityManager } from './systems/EntityManager'

class Engine {
  private systems: Array<System>
  private bus: EventBus

  /**
   * Creates an instance of engine as well as all of its 
   * systems & the event bus.
   * 
   * @memberof Engine
   */
  constructor() {
    this.bus = new EventBus();
    this.systems = Array<System>();
    this.systems.push(new EntityManager(this.bus));
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
    for (let system of this.systems) {
      system.run();
    }
    let end = performance.now(); 
    console.log('Ran gameloop in :' + (end-start).toFixed(3) + 'ms');
  }
}

export { Engine }