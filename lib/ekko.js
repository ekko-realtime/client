const io = require("socket.io-client");
const generateUUID = require("lil-uuid");

class Ekko {
  constructor(params) {
    if (this.invalidParams(params)) {
      return new Error("Invalid params");
    }

    const { host, appName, uuid, jwt, iofn = io } = params;

    this.host = this.cleanHost(host);
    this.appName = appName;
    this.uuid = uuid || generateUUID();

    this.socket = iofn(this.host + this.appName, {
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

  addListener({ message, status, presence }) {
    const on = (eventName, callback) => {
      this.socket.on(eventName, (payload) => {
        if (callback) callback(payload);
      });
    };

    on("message", message);
    on("status", status);
    on("presence", presence);
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

  cleanHost(host) {
    if (host.slice(-1) !== "/") return host + "/";
    return host;
  }

  invalidParams(params) {
    if (!params) return true;
    const { host, appName, jwt } = params;

    return !(host && appName && jwt);
  }
}

module.exports = Ekko;
