class Obstacle {
  constructor(canvasWidth, canvasHeight, kind) {
    this.kind = kind;
    // food以外はobstacleを代入
    this.type = kind === "food" ? "food" : "obstacle";
    this.hitBoxMargin = 0.2; // ヒットボックス縮小用マージン

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
      console.log("this.aspectRatio", this.aspectRatio);
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
        this.speed = w * 0.013;
        break;
    }
  }

  setHitBox() {
    // ヒットボックス
    this.hitBoxX = this.x + (this.width * this.hitBoxMargin) / 2;
    this.hitBoxY = this.y + (this.height * this.hitBoxMargin) / 2;
    this.hitBoxW = this.width * (1 - this.hitBoxMargin);
    this.hitBoxH = this.height * (1 - this.hitBoxMargin);
  }

  update() {
    this.x -= this.speed;
    this.setHitBox(); // ヒットボックス計算
  }

  draw(ctx) {
    if (this.image.complete && this.image.naturalWidth != 0) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      // ヒットボックス（テスト用）
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.hitBoxX, this.hitBoxY, this.hitBoxW, this.hitBoxH);

      console.log("this.x", this.x);
      console.log("this.width", this.width);
    } else {
      console.log("obstacle draw else");
      return;
      // ctx.fillStyle = this.kind === "food" ? "yellow" : "red";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
