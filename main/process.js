//===== main/process.js =====//
//エディタ自体の処理を担います。

import { basisData, canvasData } from "./data.js"
import { pointer } from "./input.js"

function displayClipping(x, max) {
  return Math.max(0, Math.min(max, x))
}

let pointerTimer = 0;
let pinchTimer = 0;
let previousX = null;
let previousY = null;
export const drawTemp = new Map()

function createLine(x1, y1, x2, y2) {
  const samplingNum = Math.max(1, Math.abs(x2 - x1) + Math.abs(y2- y1));
  const dx = (x2 - x1) / samplingNum;
  const dy = (y2 - y1) / samplingNum;
  const pointList = []
  let x = x1
  let y = y1
  let lastPoint = []
  for (let i = 0; i <= samplingNum; i++) {
    if (lastPoint.length === 0 || lastPoint[0] !== Math.floor(x) || lastPoint[1] !== Math.floor(y) /*重複回避*/) {
      lastPoint = [Math.floor(x), Math.floor(y)]
      pointList.push(lastPoint)
    }
    x += dx
    y += dy
  }
  return pointList;
}

function refineLine(lineData) {
  const pointList = []
  for (const point of lineData) {
    if (pointList.length > 1) {
      const p0 = point
      const p2 = pointList[pointList.length - 2]
      if (Math.abs(p0[0] - p2[0]) + Math.abs(p0[1] - p2[1]) === 2) {
        if (p0[0] !== p2[0] && p0[1] !== p2[1]) {
          pointList.pop()
        }
      }
    }
    pointList.push(point)
  }
  return pointList;
}

export function main() {
  if (pointer.pinch.active) {
    if (drawTemp.size > 0) drawTemp.clear();

    if (pinchTimer === 0) {
      basisData.drag_basisX = basisData.canvasX;
      basisData.drag_basisY = basisData.canvasY;
      basisData.drag_basisScale = basisData.scale;
    }

    const newScale = Math.max(
      2,
      basisData.drag_basisScale +
        (pointer.pinch.dist - pointer.pinch.startDist) / 30
    );

    const zoom = newScale / basisData.drag_basisScale;

    basisData.canvasX =
      pointer.pinch.centerX -
      (pointer.pinch.startCenterX - basisData.drag_basisX) * zoom;

    basisData.canvasY =
      pointer.pinch.centerY -
      (pointer.pinch.startCenterY - basisData.drag_basisY) * zoom;

    basisData.scale = newScale;

    pinchTimer++;
  } else {
    pinchTimer = 0;

    if (pointer.down) {
      pointerTimer++;
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
        basisData.canvasX =
          basisData.drag_basisX + (pointer.x - basisData.virtualOriginX);
        basisData.canvasY =
          basisData.drag_basisY + (pointer.y - basisData.virtualOriginY);
      }
    } else if (basisData.mode === "draw") {
      if (pointer.down) {
        const x = (pointer.x - basisData.canvasX) / basisData.scale;
        const y = (pointer.y - basisData.canvasY) / basisData.scale;
      
        if (previousX !== null) {
          const pointList = refineLine(createLine(previousX, previousY, x, y))
          for (const point of pointList) {
            const x = point[0];
            const y = point[1];
            const key = `${x},${y}`;

            if ((0 <= x && x < basisData.canvasWidth) && (0 <= y && y < basisData.canvasHeight) && !drawTemp.has(key)) {
              drawTemp.set(key, { x, y });
            }
          }
        }

        previousX = x
        previousY = y
      }

      if (!pointer.down) {
        previousX = null;

        if (drawTemp.size > 0) {
          for (const { x, y } of drawTemp.values()) {
            canvasData.canvas1.layer1[y][x] = "#000000";
          }
          drawTemp.clear();
        }
      }

    }
  }

  basisData.display_minX = displayClipping(
    Math.floor((0 - basisData.canvasX) / basisData.scale),
    basisData.canvasWidth - 1
  );
  basisData.display_maxX = displayClipping(
    Math.ceil((basisData.width - basisData.canvasX) / basisData.scale),
    basisData.canvasWidth - 1
  );
  basisData.display_minY = displayClipping(
    Math.floor((0 - basisData.canvasY) / basisData.scale),
    basisData.canvasHeight - 1
  );
  basisData.display_maxY = displayClipping(
    Math.ceil((basisData.height - basisData.canvasY) / basisData.scale),
    basisData.canvasHeight - 1
  );
}