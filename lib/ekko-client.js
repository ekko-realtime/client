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

  addListener({ message, status }) {
    const on = (eventName, callback) => {
      this.socket.on(eventName, (payload) => {
        if (callback) callback(payload);
      });
    };

    on("message", message);
    on("status", status);
  }

  subscribe(params) {
    params.appName = this.appName;
    params.uuid = this.uuid;
    this.socket.emit("subscribe", params);
  }

  unsubscribe(params) {
    params.appName = this.appName;
    params.uuid = this.uuid;
    this.socket.emit("unsubscribe", params);
  }

  publish(params) {
    params.appName = this.appName;
    params.uuid = this.uuid;
    this.socket.emit("publish", params);
  }

  stop() {
    this.socket.close();
  }
}

module.exports = Ekko;
