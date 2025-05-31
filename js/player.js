class Player {
  // Initialize
  constructor(x, y) {
    this.x = x; // x座標
    this.y = y; // y座標
    this.width = 40; // 幅（ピクセル）
    this.height = 40; // 高さ（ピクセル）
    this.speed = 4; // 移動速度
    this.dy = 0; // 縦方向速度

    // 画像の読み込み
    this.image = new Image(); // 組み込みクラス
    this.image.src = "./images/ootaka.png";
  }

  update() {
    this.y += this.dy; // 縦方向移動

    // 画面外に出ないように制限
    // 原点は左上なのに注意
    if (this.y < 0) this.y = 0; // 上端！
    if (this.y + this.height > 360) this.y = 360 - this.height; // 下端！
  }

  draw(ctx) {
    // 画像読み込みダブルチェック
    // 画像が読み込み未完了の場合は四角形を描写
    if (this.image.complete && this.image.naturalWidth != 0) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  moveUp() {
    this.dy = -this.speed; // 上方向がマイナス
  }

  moveDown() {
    this.dy = this.speed; // 下方向がプラス
  }

  stop() {
    this.dy = 0;
  }
}
