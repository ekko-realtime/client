// Log connection status
const message = `Client: front end of user-app opened in browser`;
const line = new Array(message.length).fill("-").join("");
console.log(`${line}\n${message}\n${line}`);

// Create ekko instance & subscribe to specified channel
// TODO: Is it ok to require users to subscribe to 1 and only 1 channel per instance? (check PubNub)
const ekko = new Ekko({
  host: "http://localhost:3000/",
});

ekko.subscribe({ channels: ["balloon"] });

// Grab HTML elements
const form = document.querySelector("form");
const thought = document.getElementById("thought");
const thoughts = document.getElementById("thoughts");

// pubnub.publish({channel: "channelName", message: {}}, callback)

// Handle form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (thought.value) {
    const params = {
      channel: "balloon",
      message: { type: "text", content: thought.value },
    };
    ekko.publish(params);
    thought.value = "";
  }
});

// Handle socket.io event
ekko.on("thought", (msg) => {
  let thought = document.createElement("LI");
  thought.innerHTML = msg;
  thoughts.insertBefore(thought, thoughts.children[0]);
  updateStyle();
});

// "info" eventType indicates informational message form the server
// TODO: should we have a few "reserved" words for this type of thing?
ekko.on("info", (message) => {
  console.log(message);
});

// Helper function to limit the list to 10 messages and style them
const updateStyle = () => {
  let thoughts = [...document.querySelectorAll("li")];
  for (let i = 0; i < thoughts.length; i++) {
    const thought = thoughts[i];
    if (i > 9) thought.parentElement.removeChild(thought);
    thought.style.color = `rgba(0, 0, 0, ${(10 - i) / 10})`;
  }
};
