import { basisData } from "./main/data.js";
import { main as processMain } from "./main/process.js";
import { display } from "./main/display.js";

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