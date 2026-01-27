//===== maon/display.js =====//
//描画のみを担います。

import { basisData, canvasData} from "./data.js";
import { drawTemp } from "./process.js";

const canvas = document.querySelector("Canvas");
const ctx = canvas.getContext("2d");

function safetyLoader(x, y, data) {
  if (y < 0 || data.length <= y) return "#111111";
  if (x < 0 || data[y].length <= x) return "#111111";
  return data[y][x];
}

function drawGrid() {
  const s = basisData.scale;
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;

  ctx.beginPath();

  // 縦線
  for (let x = basisData.display_minX; x <= basisData.display_maxX + 1; x++) {
    const px = basisData.canvasX + x * s;
    ctx.moveTo(px, basisData.canvasY + basisData.display_minY * s);
    ctx.lineTo(px, basisData.canvasY + (basisData.display_maxY + 1) * s);
  }

  // 横線
  for (let y = basisData.display_minY; y <= basisData.display_maxY + 1; y++) {
    const py = basisData.canvasY + y * s;
    ctx.moveTo(basisData.canvasX + basisData.display_minX * s, py);
    ctx.lineTo(basisData.canvasX + (basisData.display_maxX + 1) * s, py);
  }

  ctx.stroke();
}

export function square(col, row, color) {
  const size = basisData.scale;
  ctx.fillStyle = color;
  ctx.fillRect(col * size + basisData.canvasX, row * size + basisData.canvasY, size + 0.1, size + 0.1);
}

function ghostDraw() {
  ctx.globalAlpha = 0.5;
  for (const { x, y } of drawTemp.values()) {
    square(x, y, "#000000");
  }
  ctx.globalAlpha = 1.0;
}

export function display() {
  ctx.clearRect(0, 0, basisData.width, basisData.height);
  for (let x = basisData.display_minX; x <= basisData.display_maxX; x++) {
    for (let y = basisData.display_minY; y <= basisData.display_maxY; y++) {
      square(x, y, safetyLoader(x, y, canvasData.canvas1.layer1))
    }
  }
  ghostDraw()
  if (basisData.scale > 10) drawGrid()
}