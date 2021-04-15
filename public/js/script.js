// Log connection status
const message = `Client: front end of user-app opened in browser`;
const line = new Array(message.length).fill("-").join("");
console.log(`${line}\n${message}\n${line}`);



// Create ekko instance
const ekko = new Ekko({
  host: "http://localhost:3000/",
  uuid: "whateverWeWant",
});

// TODO: remove auto subscribe to balloon channel
ekko.subscribe({ channels: ["balloon"] });
let currentChannel = "balloon"; //store most recent channel subscribed to

// addListener & pass in callbacks
ekko.addListener({
  message: function (m) {
    addListItem(m);
  },
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Grab HTML elements
  const form = document.querySelector("#text-input");
  const thought = document.getElementById("thought");
  const thoughts = document.getElementById("thoughts");
  const channelSubscribeForm = document.querySelector("#channel-input");
  const channelName = document.querySelector("#channel-name");
  const channelSubscribe = document.querySelector("#channel-subscribe");
  const channelUnsubscribe = document.querySelector("#channel-unsubscribe");

  // Handle form publish submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (thought.value) {
      const params = {
        channel: currentChannel,
        message: { content: thought.value },
      };
      ekko.publish(params);
      thought.value = "";
    }
  });

  // Handle channel subscribe
  channelSubscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    currentChannel = channelName.value;
    if (channelName.value) {
      const params = {
        channels: [channelName.value],
      };
      ekko.subscribe(params);
      channelName.value = "";
    }
  });

  // Handle channel unsubscribe
  channelUnsubscribe.addEventListener("click", (e) => {
    e.preventDefault();
    if (channelName.value) {
      const params = {
        channels: [channelName.value],
      };
      subscribedChannels.filter((channel) => channel !== channelName.value);
      ekko.unsubscribe(params);
      channelName.value = "";
    }
  });
});

// Helper functions
const addListItem = (payload) => {
  let thought = document.createElement("LI");
  thought.innerHTML = payload.message.content;
  thoughts.insertBefore(thought, thoughts.children[0]);
  updateStyle();
};

const updateStyle = () => {
  let thoughts = [...document.querySelectorAll("li")];
  for (let i = 0; i < thoughts.length; i++) {
    const thought = thoughts[i];
    if (i > 9) thought.parentElement.removeChild(thought);
    thought.style.color = `rgba(0, 0, 0, ${(10 - i) / 10})`;
  }
};
