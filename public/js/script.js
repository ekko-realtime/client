const rpl = new Rpl({ host: "http://localhost:3000/" });

const form = document.querySelector("form");
const thought = document.getElementById("thought");
const thoughts = document.getElementById("thoughts");

form.addEventListener("submit", e => {
  console.log('reached the submit handler');
  e.preventDefault();

  if (thought.value) {
    rpl.publish("thought", thought.value);
    thought.value = "";
  }
})

rpl.on('thought', (msg) => {
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
