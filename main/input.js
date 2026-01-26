// main/input.js

const canvas = document.getElementById("canvas");

const pointer = {
  down: false,
  x: 0,
  y: 0
};

function setPos(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = clientX - rect.left;
  pointer.y = clientY - rect.top;
}

// Mouse
canvas.addEventListener("mousedown", e => {
  pointer.down = true;
  setPos(e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", e => {
  if (!pointer.down) return;
  setPos(e.clientX, e.clientY);
});

window.addEventListener("mouseup", () => {
  pointer.down = false;
});

// Touch
canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  pointer.down = true;
  const t = e.touches[0];
  setPos(t.clientX, t.clientY);
}, { passive: false });

canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  if (!pointer.down) return;
  const t = e.touches[0];
  setPos(t.clientX, t.clientY);
}, { passive: false });

window.addEventListener("touchend", () => {
  pointer.down = false;
});

export { pointer };