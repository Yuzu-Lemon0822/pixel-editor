import { basisData } from "./main/data.js";
import { main as processMain } from "./main/process.js";
import { display } from "./main/display.js";

const canvas = document.getElementById("canvas");

function resize() {
  basisData.width = window.innerWidth;
  basisData.height = window.innerHeight;

  canvas.width = window.innerWidth;   // ← これが重要
  canvas.height = window.innerHeight; // ← これも重要
}
window.addEventListener("resize", resize);
resize();

function loop() {
  processMain();
  display();
  requestAnimationFrame(loop);
}

loop();
