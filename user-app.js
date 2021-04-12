const express = require("express");
const app = express();
// const ekko = require("./lib/ekko-client");

const expressHandlebars = require("express-handlebars");
const port = process.env.PORT || 5000;

// const ekko = new Ekko({ host: "http://localhost:3000/" });
// ekko.socket.emit("subscribe");

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  const message = `Client: user-app started on port ${port}`;
  const line = new Array(message.length).fill("-").join("");
  console.log(`${line}\n${message}\n${line}`);
});
