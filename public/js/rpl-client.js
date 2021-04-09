class Rpl {
  constructor({ host }) {
    this.host = host;

    this.socket = io(this.host);

    this.socket.on("connect", () => {
      console.log("Connected to rpl server");
    });
  }
}
