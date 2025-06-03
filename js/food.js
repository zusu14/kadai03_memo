class Food {
  constructor(canvasWidth, canvasHeight) {
    this.type = "food";
    this.adaptToCanvasSize(canvasWidth, canvasHeight);

    // 画像の読み込み
    this.image = new Image(); // 組み込みクラス
    this.image.src = "./images/dobato.png";
  }

  adaptToCanvasSize(w, h) {
    this.width = w * 0.05;
    this.height = h * 0.1;
    this.speed = w * 0.005;
    this.x = w;
    this.y = h * 0.9 - this.height;
  }

  update(canvasWidth) {
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
