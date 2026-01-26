export function createPointer(canvas) {
  const state = {
    down: false,
    x: 0,
    y: 0
  };

  function setPos(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    state.x = clientX - rect.left;
    state.y = clientY - rect.top;
  }

  // ===== マウス =====
  canvas.addEventListener("mousedown", e => {
    state.down = true;
    setPos(e.clientX, e.clientY);
  });

  canvas.addEventListener("mousemove", e => {
    if (!state.down) return;
    setPos(e.clientX, e.clientY);
  });

  window.addEventListener("mouseup", () => {
    state.down = false;
  });

  // ===== タッチ =====
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    state.down = true;
    const t = e.touches[0];
    setPos(t.clientX, t.clientY);
  }, { passive: false });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!state.down) return;
    const t = e.touches[0];
    setPos(t.clientX, t.clientY);
  }, { passive: false });

  window.addEventListener("touchend", () => {
    state.down = false;
  });

  return state;
}
