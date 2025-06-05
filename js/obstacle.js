class Obstacle {
  constructor(canvasWidth, canvasHeight, kind = "food") {
    this.kind = kind;
    // food以外はobstacleを代入
    this.type = kind === "food" ? "food" : "obstacle";

    // 種類ごとの画像を指定
    this.image = new Image();
    switch (kind) {
      case "food":
        this.image.src = "./images/dobato.png";
        break;
      case "house":
        this.image.src = "./images/house.png";
        break;
      case "building":
        this.image.src = "./images/building.png";
        break;
      case "frog":
        this.image.src = "./images/frog.png";
        break;
      case "helicopter":
        this.image.src = "./images/helicopter.png";
        break;
    }

    // サイズ等パラメータ指定
    this.image.onload = () => {
      // onloadで読み込み後でないと取得できない
      this.aspectRatio = this.image.naturalWidth / this.image.naturalHeight; // 元画像のアスペクト比
      this.adaptToCanvasSize(canvasWidth, canvasHeight);
    };
  }

  adaptToCanvasSize(w, h) {
    this.x = w; // 右端から描画スタート

    switch (this.kind) {
      case "food":
        this.scale = 0.1;
        this.height = h * this.scale;
        this.width = this.height * this.aspectRatio;
        this.y = h * 0.9 - this.height;
        this.speed = w * 0.011;
        break;
      case "house":
        this.scale = 0.3;
        this.height = h * this.scale;
        this.width = this.height * this.aspectRatio;
        this.y = h * 0.9 - this.height;
        this.speed = w * 0.01;
        break;
      case "building":
        this.scale = 0.65;
        this.height = h * this.scale;
        this.width = this.height * this.aspectRatio;
        this.y = h * 0.9 - this.height;
        this.speed = w * 0.01;
        break;
      case "frog":
        this.scale = 0.1;
        this.height = h * this.scale;
        this.width = this.height * this.aspectRatio;
        this.y = h * 0.9 - this.height;
        this.speed = w * 0.011;
        break;
      case "helicopter":
        this.scale = 0.25;
        this.height = h * this.scale;
        this.width = this.height * this.aspectRatio;
        this.y = h * 0.1;
        this.speed = w * 0.011;
        break;
    }
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    if (this.image.complete && this.image.naturalWidth != 0) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.kind === "food" ? "yellow" : "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
