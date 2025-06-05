class Background {
  constructor(canvasWidth, canvasHeight) {
    this.image = new Image();
    this.image.src = "./images/background.png";
    this.x = 0; // スクロール初期位置

    this.adaptToCanvasSize(canvasWidth, canvasWidth);
  }

  // キャンバスサイズに合わせたパラメータ設定
  adaptToCanvasSize(w, h) {
    this.width = w;
    this.height = h;
    this.speed = w * 0.012;
  }

  update() {
    this.x -= this.speed;

    // 左端までスクロールしたらリセット
    if (this.x <= -this.width) {
      this.x = 0;
    }
  }

  draw(ctx) {
    // 2枚連続描画
    ctx.drawImage(this.image, this.x, 0, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
  }
}
