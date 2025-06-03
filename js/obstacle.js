class Obstacle {
  constructor(canvasWidth, canvasHeight, kind = "food") {
    this.kind = kind;
    // food以外はobstacleを代入
    this.type = kind === "food" ? "food" : "obstacle";
    this.adaptToCanvasSize(canvasWidth, canvasHeight);

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
    }
  }

  adaptToCanvasSize(w, h) {
    this.width = w * 0.05;
    this.height = h * 0.1;
    this.speed = w * 0.005;
    this.x = w;
    this.y = h * 0.9 - this.height;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    if (this.image.complete && this.image.naturalWidth != 0) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.kind === "food" ? "yellow" : "red";
      ctx.fillRect(this.image, this.x, this.y, this.width, this.height);
    }
  }
}
