import { Event } from './Event'
class DestroyEntityEvent extends Event {
  id: String
  constructor(id: String) {
    super('entity');
    this.id = id;
  }
}

export { DestroyEntityEvent }