const io = require("socket.io-client");

class Ekko {
  constructor({ host, appName, authKey, uuid }) {
    this.host = host;
    this.appName = appName;
    this.authKey = authKey;
    this.uuid = uuid;
    this.socket = io(this.host, { transports: ["websocket"] });

    this.socket.on("connect", () => {});
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

module.exports = Ekko;
