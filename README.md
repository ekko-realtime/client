# rpl - user app example

## TODO

- Add wrappers around socket.io methods in BOTH `rpl-client.js` files
- Get the `publish` and `subscribe` stuff setup
- Add in DOM modification to update the actual DOM

```
// CODE FROM "Ephemeral" front end

<script>
  const socket = io();
  const form = document.querySelector("form");
  const thought = document.getElementById("thought");
  const thoughts = document.getElementById("thoughts");

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (thought.value) {
      socket.emit("thought", thought.value);
      thought.value = "";
    }
  })

  socket.on('thought', (msg) => {
    let thought = document.createElement('LI');
    thought.innerHTML = msg
    thoughts.insertBefore(thought, thoughts.children[0])
    updateStyle()
  })

  const updateStyle = () => {
    let thoughts = [...document.querySelectorAll("li")];
    for (let i = 0; i < thoughts.length; i++) {
      const thought = thoughts[i];

      if (i > 9) {
        thought.parentElement.removeChild(thought);
      }

      thought.style.color = `rgba(0, 0, 0, ${(10 - i) / 10})`;
    }
  }
</script>

```
