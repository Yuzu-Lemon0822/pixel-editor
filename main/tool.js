//===== main/tool.js =====//
//エディタに直接影響のないツール切り替えやパレットの処理を担います。

import { basisData } from "./data.js"
import { pointer } from "./input.js"

function main() {
  if (pointer.x < 80) {//ツールバー

  } else if (pointer.y > basisData.height - 80) {//パレット

  }
}