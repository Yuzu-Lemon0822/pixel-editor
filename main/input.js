//===== main/input.js =====//
//クリック、タッチ判定を担います。

const canvas = document.getElementById("canvas");

const pointer = {
  down: false,
  x: 0,
  y: 0,

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

function setPos(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = clientX - rect.left;
  pointer.y = clientY - rect.top;
}

function getDist(t1, t2) {
  return Math.hypot(
    t1.clientX - t2.clientX,
    t1.clientY - t2.clientY
  );
}

function getCenter(t1, t2) {
  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  };
}

/* ===== Mouse ===== */
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

/* ===== Touch ===== */
canvas.addEventListener("touchstart", e => {
  e.preventDefault();

  if (e.touches.length === 1) {
    pointer.down = true;
    const t = e.touches[0];
    setPos(t.clientX, t.clientY);
  }

  if (e.touches.length === 2) {
    pointer.down = false; // ← draw無効化
    pointer.pinch.active = true;

    const [t1, t2] = e.touches;
    const c = getCenter(t1, t2);

    pointer.pinch.startCenterX = c.x;
    pointer.pinch.startCenterY = c.y;
    pointer.pinch.centerX = c.x;
    pointer.pinch.centerY = c.y;

    pointer.pinch.startDist = getDist(t1, t2);
    pointer.pinch.dist = pointer.pinch.startDist;
  }
}, { passive: false });

canvas.addEventListener("touchmove", e => {
  e.preventDefault();

  if (e.touches.length === 1 && !pointer.pinch.active) {
    const t = e.touches[0];
    setPos(t.clientX, t.clientY);
  }

  if (e.touches.length === 2) {
    const [t1, t2] = e.touches;
    const c = getCenter(t1, t2);

    pointer.pinch.centerX = c.x;
    pointer.pinch.centerY = c.y;
    pointer.pinch.dist = getDist(t1, t2);
  }
}, { passive: false });

window.addEventListener("touchend", e => {
  if (e.touches.length < 2) {
    pointer.pinch.active = false;
  }
  if (e.touches.length === 0) {
    pointer.down = false;
  }
});

export { pointer };