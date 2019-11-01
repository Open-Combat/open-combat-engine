import { Event } from './Event'
class CreateEntityEvent extends Event {
  constructor() {
    super('entity');
  }
}

export { CreateEntityEvent }