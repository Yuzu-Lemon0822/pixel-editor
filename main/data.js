export let basisData = {
  width: window.innerWidth, //画面のサイズ(px)
  height: window.innerHeight,
  canvasWidth: 10, //ドット絵キャンバス自体のサイズ(マス目)
  canvasHeight: 10,
  canvasX: 0, //ドット絵キャンバスの左上の位置
  canvasY: 0,
  scale: 15, //ドット絵キャンバスのマス目のサイズ(マス目->pxの変換用)
  display_minX: 0,
  display_minY: 0,
  display_maxX: 0,
  display_maxY: 0,
}

function createCanvas(w, h, color) {
  return Array.from({ length: h }, () =>
    Array(w).fill(color)
  );
}

export let canvasData = {
  canvas1: {
    layer1: createCanvas(64, 64, "#ffffff")
  }
}