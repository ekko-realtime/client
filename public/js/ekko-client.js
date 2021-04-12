class Ekko {
  constructor({ host, channel }) {
    this.host = host;
    this.channel = channel;
    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("Client: Connected to ekko server");
    });

    this.socket.emit("subscribe", this.channel);
  }

  // Client emit actions will always have a channel in the payload
  /*
  TODO ADD METHODS TO CLIENT API
  publish
  subscribe
  event listener
  disconnect

  change ekko instatiation
    - remove channel

  add listner to ekko class
  
  make ekko subscribe method
  make ekko unsubscribe method

  */
  publish(eventType, data) {
    const payload = {
      channel: this.channel,
      eventType,
      data,
    };
    this.socket.emit("publish", payload);
  }

  on(eventName, callback) {
    this.socket.on(eventName, (data) => {
      callback(data);
    });
  }

  /*
  pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel to which the message was published
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        var publisher = m.publisher; //The Publisher
    },
});
  */

  disconnect() {
    this.socket.close();
  }
}
