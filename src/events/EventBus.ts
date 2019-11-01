/**
 * The EventBus will be the way of communicating between systems.
 * Topics can be created and events can be published to topics.
 * Systems can publish and subscribe to topics. Events are added to a
 * topic in an EventQueue.
 *
 * @class EventBus
 */

import { Event } from './Event'

class EventBus {
  topics: Map<String, Array<Event>>
  constructor() {
    this.topics = new Map<String, Array<Event>>();
  }

  publish(event: Event): void {
    if (this.topics.has(event.topic))
      this.topics.get(event.topic).push(event);
    else {
      this.topics.set(event.topic, new Array<Event>());
      this.topics.get(event.topic).push(event);
    }                      
    console.log('Event published: ' + JSON.stringify(event));
  }

  getEvents(topic): Array<Event> {
    if (this.topics.has(topic))
      return this.topics.get(topic);
    throw new Error('Topic: ' + topic + 'does not exist');
  }

}

export { EventBus }