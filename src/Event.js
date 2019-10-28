/**
 * The event class encapsulates the name of an event and the
 * data that it is meant to carry. Some examples of events
 * are; the creation of an entity, a collision
 * between two entities, or a keystroke.
 *
 * @class Event
 */
class Event {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

export { Event }