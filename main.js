const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvasを画面いっぱいに
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ポインター座標
let px = canvas.width / 2;
let py = canvas.height / 2;
let isDown = false; // ← 押下状態

// ===== 描画 =====
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isDown) {
    ctx.fillStyle = "#00ffff";
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();

// ===== 座標設定 =====
function setPos(x, y) {
  const rect = canvas.getBoundingClientRect();
  px = x - rect.left;
  py = y - rect.top;
}

// ===== マウス =====
canvas.addEventListener("mousedown", e => {
  isDown = true;
  setPos(e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", e => {
  if (!isDown) return;
  setPos(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", () => {
  isDown = false;
});

canvas.addEventListener("mouseleave", () => {
  isDown = false;
});

// ===== タッチ =====
canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  isDown = true;
  const t = e.touches[0];
  setPos(t.clientX, t.clientY);
});

canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  if (!isDown) return;
  const t = e.touches[0];
  setPos(t.clientX, t.clientY);
});

canvas.addEventListener("touchend", () => {
  isDown = false;
});
