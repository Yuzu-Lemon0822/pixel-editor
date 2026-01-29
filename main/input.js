//===== main/input.js =====//
// Canvas Input Manager（拡張前提）

const pointer = {
  down: false,

  x: 0,
  y: 0,

  globalX: 0,
  globalY: 0,

  target: null,

  pinch: {
    active: false,
    centerX: 0,
    centerY: 0,
    dist: 0,

    startCenterX: 0,
    startCenterY: 0,
    startDist: 0,
  }
};

// ===============================
// Canvas Layer Registry
// ===============================
const layers = [];

function registerCanvas(canvas, options = {}) {
  layers.push({
    canvas: canvas,
    elem: document.getElementById(canvas),
    priority: options.priority ?? 0,
/*
    onPointerDown: options.onPointerDown,
    onPointerMove: options.onPointerMove,
    onPointerUp: options.onPointerUp,
*/
  });

  // priority 高い順（＝入力的に上）
  layers.sort((a, b) => b.priority - a.priority);
}

// ===============================
// Hit Test
// ===============================
function hitTest(clientX, clientY) {
  for (const layer of layers) {
    const r = layer.elem.getBoundingClientRect(); 
    if (
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom
    ) {
      return layer;
    }
  }
  return null;
}

function setLocalPos(layer, clientX, clientY) {
  const r = layer.elem.getBoundingClientRect();
  pointer.x = clientX - r.left;
  pointer.y = clientY - r.top;
}

function setGrobalPos(e) {
  pointer.globalX = e.clientX;
  pointer.globalY = e.clientY;
}

// ===============================
// Pointer Events
// ===============================
window.addEventListener("pointerdown", e => {
  setGrobalPos(e);

  const layer = hitTest(e.clientX, e.clientY);
  if (!layer) return;

  pointer.down = true;
  pointer.target = layer;
  setLocalPos(layer, e.clientX, e.clientY);

  layer.onPointerDown?.(pointer, e);
});

window.addEventListener("pointermove", e => {
  setGrobalPos(e);

  if (!pointer.down || !pointer.target) return;

  setLocalPos(pointer.target, e.clientX, e.clientY);
  pointer.target.onPointerMove?.(pointer, e);
});

window.addEventListener("pointerup", e => {
  setGrobalPos(e);

  if (pointer.target) {
    pointer.target.onPointerUp?.(pointer, e);
  }

  pointer.down = false;
  pointer.target = null;
});

// ===============================
// Touch Pinch (optional)
// ===============================
window.addEventListener("touchstart", e => {
  if (e.touches.length === 2) {
    pointer.down = false;
    pointer.pinch.active = true;

    const [t1, t2] = e.touches;
    const cx = (t1.clientX + t2.clientX) / 2;
    const cy = (t1.clientY + t2.clientY) / 2;

    pointer.pinch.startCenterX = cx;
    pointer.pinch.startCenterY = cy;
    pointer.pinch.centerX = cx;
    pointer.pinch.centerY = cy;

    pointer.pinch.startDist = Math.hypot(
      t1.clientX - t2.clientX,
      t1.clientY - t2.clientY
    );
    pointer.pinch.dist = pointer.pinch.startDist;
  }
}, { passive: false });

window.addEventListener("touchmove", e => {
  if (!pointer.pinch.active || e.touches.length !== 2) return;

  const [t1, t2] = e.touches;
  pointer.pinch.centerX = (t1.clientX + t2.clientX) / 2;
  pointer.pinch.centerY = (t1.clientY + t2.clientY) / 2;
  pointer.pinch.dist = Math.hypot(
    t1.clientX - t2.clientX,
    t1.clientY - t2.clientY
  );
}, { passive: false });

window.addEventListener("touchend", e => {
  if (e.touches.length < 2) {
    pointer.pinch.active = false;
  }
});

// ===============================
export {
  pointer,
  registerCanvas
};
