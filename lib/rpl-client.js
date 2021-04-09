const io = require("socket.io-client");

class Rpl {
  constructor({ host }) {
    this.host = host;

    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("Connected to rpl server");
    });
  }

  publish(message) {
    this.socket.emit("message", message);
  }


  on(eventName, callback) {
    this.socket.on(eventName, (data) => {
      callback(data);
    });
  }
}

module.exports = Rpl;
