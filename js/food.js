class Food {
  constructor(x, y) {
    this.x = x; // x座標
    this.y = y; // y座標
    this.width = 20; // 幅（ピクセル）
    this.height = 20; // 高さ（ピクセル）
    this.speed = 2; // 移動速度
    this.type = "food";

    // 画像の読み込み
    this.image = new Image(); // 組み込みクラス
    this.image.src = "./images/dobato.png";
  }

  update() {
    this.x -= this.speed; // 左に移動
  }

  draw(ctx) {
    if (this.image.complete && this.image.naturalWidth != 0) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
