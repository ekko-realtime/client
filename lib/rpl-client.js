const io = require("socket.io-client");

class Rpl {
  constructor({ host }) {
    this.host = host;

    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("hi");
    });
  }
}

module.exports = Rpl;
