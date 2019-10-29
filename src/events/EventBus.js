/**
 * The EventBus will be the way of communicating between systems.
 * Topics can be created and events can be published to topics.
 * Systems can publish and subscribe to topics. Events are added to a
 * topic in an EventQueue.
 *
 * @class EventBus
 */

import { Event } from './Event.js'
import { EVENTS } from './EVENTS.js'

class EventBus {
  constructor() {
    this.topics = {}; // 'topic' : -> [events]


    // testing
    let event = new Event(EVENTS.createEntity, {});
    this.topics['entity'] = [event];
  }

  /**
   * Publish an event to a topic's event queue.
   *
   * @param {*} topic
   * @param {*} event
   * @memberof EventBus
   */
  publish(event) {
    // if the event isn't of type Event throw error
    if (!(event instanceof Event))
      throw new Error('Attempt to publish invalid event type');
    console.log('Event published: ' + event);

    // if topic doesn't exist create a new event queue for the topic
    if(typeof this.topics[event.topic] === undefined)
      this.topics[event.topic] = [];
    
    // push the event onto the topic's event queue
    this.topics[event.topic].push(event);
  }

  /**
   * Get all of the events from the topic queue.
   *
   * @param {*} topic
   * @memberof EventBus
   */
  getEvents(topic) {
    console.log(JSON.stringify(this.topics));
    // if the topic exists return the topic's event queue
    if (typeof this.topics[topic] !== undefined)
      return this.topics[topic];
    
    // if the topic doesn't exist throw an error
    throw new Error('Topic: ' + topic + 'does not exist');
  }

}

export { EventBus }