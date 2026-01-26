import { basisData, canvasData } from "./data.js"
import { pointer } from "./input.js"

function displayClipping(x, max) {
  return Math.max(0, Math.min(max, x))
}

let pointerTimer = 0;
export const drawTemp = new Map()

export function main() {
  if (pointer.down) {
    pointerTimer++
  } else {
    pointerTimer = 0;
  }

  if (basisData.mode === "move") {
    if (pointer.down) {
      if (pointerTimer === 1) {
        basisData.drag_basisX = basisData.canvasX;
        basisData.drag_basisY = basisData.canvasY;
        basisData.virtualOriginX = pointer.x;
        basisData.virtualOriginY = pointer.y;
      }
      basisData.canvasX = basisData.drag_basisX + (pointer.x - basisData.virtualOriginX);
      basisData.canvasY = basisData.drag_basisY + (pointer.y - basisData.virtualOriginY);
    }
  } else if (basisData.mode === "draw") {
    if (pointer.down) {
      const x = Math.floor((pointer.x - basisData.canvasX) / basisData.scale);
      const y = Math.floor((pointer.y - basisData.canvasY) / basisData.scale);

      const key = `${x},${y}`;

      if (
        0 <= x && x < basisData.canvasWidth &&
        0 <= y && y < basisData.canvasHeight &&
        !drawTemp.has(key)
      ) {
        drawTemp.set(key, { x, y });
      }
    }

    if (!pointer.down && drawTemp.size > 0) { 
      for (const { x, y } of drawTemp.values()) {
        canvasData.canvas1.layer1[y][x] = "#000000";
      }
      drawTemp.clear();
    }
  }

  basisData.display_minX = displayClipping(Math.floor((0 - basisData.canvasX) / basisData.scale), basisData.canvasWidth - 1);
  basisData.display_maxX = displayClipping(Math.ceil((basisData.width - basisData.canvasX) / basisData.scale), basisData.canvasWidth - 1);
  basisData.display_minY = displayClipping(Math.floor((0 - basisData.canvasY) / basisData.scale), basisData.canvasHeight - 1);
  basisData.display_maxY = displayClipping(Math.ceil((basisData.height - basisData.canvasY) / basisData.scale), basisData.canvasHeight - 1);
}