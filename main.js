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

// ===== 描画 =====
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ポインター
  ctx.fillStyle = "#00ffff";
  ctx.beginPath();
  ctx.arc(px, py, 8, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(draw);
}
draw();

// ===== 座標取得関数 =====
function setPos(x, y) {
  const rect = canvas.getBoundingClientRect();
  px = x - rect.left;
  py = y - rect.top;
}

// ===== マウス =====
canvas.addEventListener("mousemove", e => {
  setPos(e.clientX, e.clientY);
});

// ===== タッチ =====
canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  const t = e.touches[0];
  setPos(t.clientX, t.clientY);
});

canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  const t = e.touches[0];
  setPos(t.clientX, t.clientY);
});
