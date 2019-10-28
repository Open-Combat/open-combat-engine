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
   * Registers a list of new topics with the bus
   *
   * @param {*} topic
   * @memberof EventBus
   */
  register(topics) {
    for (var topic in topics) {
      if (typeof this.topics.topic === undefined)
        this.topics.topic = [];
      else
        console.log('Attempt to register an already registered topic');
    }
  }

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
  publish(topic, event) {
    console.log('Event published: ' + event + ' to topic: ' + topic);

    this.topics.topic.push(event);
  }

  /**
   * Get all of the events from the topic queue.
   *
   * @param {*} topic
   * @memberof EventBus
   */
  getEvents(topic) {
    if (this.topics.topic)
      throw 'Topic: ' + topic + 'does not exist'
    return this.topics.topic;
  }
}

export { EventBus }