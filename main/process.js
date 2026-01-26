import { basisData } from "./data.js"
import { pointer } from "./input.js"

function displayClipping(x, max) {
  return Math.max(0, Math.min(max, x))
}

let pointerTimer = 0;

export function main() {
  if (mode === "move") {
    if (pointer.down) {
      if (pointerTimer === 0) {
        basisData.drag_basisX = basisData.canvasX;
        basisData.drag_basisY = basisData.canvasY;
        basisData.virtualOriginX = pointer.x;
        basisData.virtualOriginY = pointer.y;
      }
      pointerTimer++
      basisData.canvasX = basisData.drag_basisX + (pointer.x - basisData.virtualOriginX);
      basisData.canvasY = basisData.drag_basisY + (pointer.y - basisData.virtualOriginY);
    } else {
      pointerTimer = 0;
    }
  } else if (mode === "draw") {

  }

  basisData.display_minX = displayClipping(Math.floor((0 - basisData.canvasX) / basisData.scale), basisData.canvasWidth - 1);
  basisData.display_maxX = displayClipping(Math.ceil((basisData.width - basisData.canvasX) / basisData.scale), basisData.canvasWidth - 1);
  basisData.display_minY = displayClipping(Math.floor((0 - basisData.canvasY) / basisData.scale), basisData.canvasHeight - 1);
  basisData.display_maxY = displayClipping(Math.ceil((basisData.height - basisData.canvasY) / basisData.scale), basisData.canvasHeight - 1);
}