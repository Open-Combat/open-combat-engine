/**
 * The event class encapsulates the topic of an event and the
 * data that it is meant to carry. Some examples of events
 * are; the creation of an entity, a collision
 * between two entities, or a keystroke.
 *
 * @class Event
 */
class Event {
  constructor(topic, data) {
    this.topic = topic;
    this.data = data;
  }
}

export { Event }