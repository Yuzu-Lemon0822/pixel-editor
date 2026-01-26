import { basisData, canvasData} from "./data.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function safetyLoader(x, y, data) {
  if (y < 0 || data.length <= y) return "#ffffff";
  if (x < 0 || data[y].length <= x) return "#ffffff";
  return data[y][x];
}

export function square(col, row, color) {
  const size = basisData.scale;
  ctx.fillStyle = color;
  ctx.fillRect(col * size + basisData.canvasX, row * size + basisData.canvasY, size, size);
}

export function display() {
  ctx.clearRect(0, 0, basisData.width, basisData.height);
  for (let x = basisData.display_minX; x <= basisData.display_maxX; x++) {
    for (let y = basisData.display_minY; y <= basisData.display_maxY; y++) {
      square(x, y, safetyLoader(x, y, canvasData.canvas1.layer1))
    }
  }
}