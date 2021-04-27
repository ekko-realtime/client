const io = require("socket.io-client");
const generateUUID = require("lil-uuid");

class Ekko {
  constructor({ host, appName, uuid, jwt }) {
    this.host = host;
    this.appName = appName;
    this.uuid = uuid || generateUUID();

    this.socket = io(this.host + this.appName, {
      transports: ["websocket"],
      auth: { jwt, uuid: this.uuid },
    });

    this.socket.on("connect", () => {
      console.log("connected");
    });

    this.socket.on("connect_error", (err) => {
      console.log(err.message);
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
    params.uuid = this.uuid;
    this.socket.emit("subscribe", params);
  }

  unsubscribe(params) {
    params.uuid = this.uuid;
    this.socket.emit("unsubscribe", params);
  }

  publish(params) {
    params.uuid = this.uuid;
    this.socket.emit("publish", params);
  }

  stop() {
    this.socket.close();
  }
}

module.exports = Ekko;
