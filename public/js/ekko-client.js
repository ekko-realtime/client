class Ekko {
  constructor({ host }) {
    this.host = host;
    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("Client: Connected to ekko server");
    });
  }

  // Client emit actions will always have a channel in the params
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

  // pubnub.publish({channel: "channelName", message: {}}, callback)

  publish(params, callback) {
    // TODO what is callback for?
    // const params = {
    //   eventType,
    //   data,
    // };
    this.socket.emit("publish", params);
  }

  on(eventName, callback) {
    this.socket.on(eventName, (data) => {
      callback(data);
    });
  }

  subscribe(params) {
    this.socket.emit("subscribe", params);
  }

  // { channels: ["balloon"] }

  unsubscribe(params) {
    this.socket.emit("unsubscribe", params);
    console.log('unsubscribed from channel');
  }

  /*
  pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel to which the message was published
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The params
        var publisher = m.publisher; //The Publisher
    },
});
  */

  disconnect() {
    this.socket.close();
  }
}
