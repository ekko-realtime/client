const io = require("socket.io-client");
const generateUUID = require("lil-uuid");

class Ekko {
  constructor({ host, appName, authKey, uuid }) {
    this.host = host;
    this.appName = appName;
    this.authKey = authKey;
    this.uuid = uuid || generateUUID();
    this.socket = io(this.host, { transports: ["websocket"] });
    this.auth = false;

    this.socket.on("connect", () => {
      this.socket
        .emit("authenticate", { token: authKey })
        .on("authenticated", () => (this.auth = true))
        .on("unauthorized", (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
          throw new Error(msg.data.type);
        });
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

module.exports = Ekko;
