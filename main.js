import { basisData, windowData } from "./main/data.js";
import { main as processMain } from "./main/process.js";
import { display } from "./main/display.js";

function resize(canvas, width, height) {
  canvas.width = width;   // ← これが重要
  canvas.height = height; // ← これも重要
}
window.addEventListener("resize", resize);
resize(document.getElementById("editorCanvas"), window.innerWidth, window.innerHeight);

function loop() {
  processMain();
  display();
  requestAnimationFrame(loop);
}

loop();
