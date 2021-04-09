
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

  subscribe(channel) {
    this.socket.emit("subscribe", channel);
    return new Channel(this.socket, channel);
  }

  unsubscribe(channel) {
    this.socket.emit("unsubscribe", channel);
  }

  disconnect() {
    this.socket.close();
  }
}

class Channel {
  constructor(socket, channel) {
    this.socket = socket;
    this.channel = channel;
  }

  bind(eventName, callback) {
    this.socket.on(eventName, (payload) => {
      console.log(eventName, payload);
      if (payload.channel == this.channel) {
        callback(payload.data);
      }
    });
  }
}

