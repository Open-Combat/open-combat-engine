import { Event } from './Event'
class EntityDestroyedEvent extends Event {
  constructor() {
    super('entity');
  }
}

export { EntityDestroyedEvent }