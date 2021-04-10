class Rpl {
  constructor({ host, channel }) {
    this.host = host;
    this.channel = channel;
    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("Client: Connected to rpl server");
    });

    this.socket.emit("subscribe", this.channel);
  }

  // Client emit actions will always have a channel in the payload
  publish(eventType, data) {
    const payload = {
      channel: this.channel,
      eventType,
      data,
    };
    this.socket.emit("publish", payload);
  }

  on(eventName, callback) {
    this.socket.on(eventName, (data) => {
      callback(data);
    });
  }

  disconnect() {
    this.socket.close();
  }
}
