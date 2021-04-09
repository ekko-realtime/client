const express = require("express");
const app = express();
const Rpl = require("./lib/rpl-client");

const expressHandlebars = require("express-handlebars");
const port = process.env.PORT || 5000;

const rpl = new Rpl({ host: "http://localhost:3000/" });
rpl.socket.emit("subscribe");

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
  console.log(`Server started on port ${port}. press Ctrl + C to terminate`);
});
