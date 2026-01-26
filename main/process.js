import { basisData } from "./data.js"

function displayClipping(x, max) {
  return Math.max(0, Math.min(max, x))
}

basisData.display_minX = displayClipping(Math.floor((0 - basisData.canvasX) / basisData.scale), basisData.canvasWidth - 1)
basisData.display_maxX = displayClipping(Math.ceil((basisData.width - basisData.cx) / basisData.scale), basisData.canvasWidth - 1)
basisData.display_minY = displayClipping(Math.floor((0 - basisData.canvasY) / basisData.scale), basisData.canvasHeight - 1)
basisData.display_maxY = displayClipping(Math.ceil((basisData.height - basisData.cy) / basisData.scale), basisData.canvasHeight - 1)