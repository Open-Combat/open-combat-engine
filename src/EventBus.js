class EventBus {
  constructor() {
    console.log('Initializing EventBus...');

    this.topics = {}; // 'topic' : -> [events]
  }

  // Questions to answer...
  // 1. how to subscribe to a topic
  // 2. how to publish messages to a topic
  // 3. how to deliver messages
  // 4. when to remove messages from a topic
  // 5. how to unsubscribe from a topic

  /**
   * Allow a subscriber to subscribe to a topic.
   *
   * @param {*} topics
   * @memberof EventBus
   */
  subscribe(topics) {
    for (var topic in topics) {
      console.log('Subscribing to topic: ' + topic);
    }
  }

  /**
   * Publish an event to a topic's event queue.
   *
   * @param {*} topic
   * @param {*} event
   * @memberof EventBus
   */
  publish(event) {
    if (typeof event !== Event)
      throw 'Attempt to publish invalid event type'
    console.log('Event published: ' + event);
    if(typeof this.topics[event.name] === undefined)
      this.registerTopic(event.name);
    this.topics[event.name].push(event);
  }

  /**
   * Registers a new topic with the bus
   *
   * @param {*} topic
   * @memberof EventBus
   */
  registerTopic(topic) {
    if (typeof this.topics[topic] === undefined)
      this.topics[topic] = [];
    else
      console.log('Attempt to register an already registered topic');
  }

  /**
   * Get all of the events from the topic queue.
   *
   * @param {*} topic
   * @memberof EventBus
   */
  getEvents(topic) {
    console.log(this.topics[topic]);
    if (typeof this.topics[topic] !== undefined)
      return this.topics[topic];
    else
      throw 'Topic: ' + topic + 'does not exist'  
  }

}

export { EventBus }