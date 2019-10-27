class EventBus {
  constructor() {
    this.topics = {}; // 'topic' : -> [messages]
  }

  // Questions to answer...
  // 1. how to subscribe to a topic
  // 2. how to publish messages to a topic
  // 3. how to deliver messages
  // 4. when to remove messages from a topic
  // 5. how to unsubscribe from a topic

  subscribeTopic(topic) {

  }

  subscribeTopics(topics) {
    for (topic in topics) {
      this.subscribeTopic(topic);
    }
  }

  publish(topic, message) {
    this.topics.topic.push(message);
  }
}