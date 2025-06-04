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
    // this.speed = w * 0.01;
    this.x = w;

    switch (this.kind) {
      case "food":
        this.width = w * 0.05;
        this.height = h * 0.1;
        this.y = h * 0.9 - this.height;
        this.speed = w * 0.011;
        break;
      case "house":
        this.width = w * 0.225;
        this.height = h * 0.4;
        this.y = h * 0.9 - this.height;
        this.speed = w * 0.01; // backgroundと合わせる
        break;
      case "building":
        this.width = w * 0.12;
        this.height = h * 0.65;
        this.y = h * 0.9 - this.height;
        this.speed = w * 0.01; // backgroundと合わせる
        break;
      case "frog":
        this.width = w * 0.05;
        this.height = h * 0.1;
        this.y = h * 0.9 - this.height;
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
