class Rpl {
  constructor({ host }) {
    this.host = host;

    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("Connected to rpl server");
    });
  }

  publish(eventType, message) {
    this.socket.emit(eventType, message);
  }

  on(eventName, callback) {
    this.socket.on(eventName, (data) => {
      callback(data);
    });
  }
}
