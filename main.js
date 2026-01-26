import { basisData } from "./data.js";
import { main as processMain } from "./process.js";
import { display } from "./display.js";

function resize() {
  basisData.width = window.innerWidth;
  basisData.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function loop() {
  processMain();
  display();
  requestAnimationFrame(loop);
}

loop();