class Ekko {
  constructor({ host, uuid }) {
    this.host = host;
    this.uuid = uuid;
    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("Client: Connected to ekko server");
    });
  }

  publish(params, callback) {
    // TODO what is callback for?
    params.publisher = this.uuid;
    this.socket.emit("publish", params);
  }

  addListener({ message, presence, objects, status }) {
    const on = (eventName, callback) => {
      this.socket.on(eventName, (data) => {
        callback(data);
      });
    };

    on("message", message);
    on("presence", presence);
    on("objects", objects);
    on("status", status);
  }

  subscribe(params) {
    //TODO: add check to see if already subscribed to channel?
    this.socket.emit("subscribe", params);
    console.log("Client: subscribed to channel");
  }

  unsubscribe(params) {
    this.socket.emit("unsubscribe", params);
    console.log("Client: unsubscribed from channel");
  }

  disconnect() {
    this.socket.close();
    console.log("Client: user disconnected");
  }
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
