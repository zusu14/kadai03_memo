class Player {
  // Initialize
  constructor(canvasWidth, canvasHeight) {
    this.adaptToCanvasSize(canvasWidth, canvasHeight);
    this.dy = 0; // 縦方向移動速度
    this.life = 3; // ライフ初期値

    // 画像の読み込み
    this.image = new Image(); // 組み込みクラス
    this.image.src = "./images/ootaka.png";
  }

  // キャンバスサイズに合わせたパラメータ設定
  adaptToCanvasSize(w, h) {
    this.width = w * 0.05;
    this.height = h * 0.1;
    this.speed = h * 0.01; // 移動速さ（絶対値）
    this.x = w * 0.1; // 画面高さの1%を1フレームあたりの速度とする
    this.y = h * 0.5 - this.height / 2;
  }

  update(canvasHeight) {
    this.y += this.dy; // 縦方向移動

    // 画面外に出ないように制限
    // 原点は左上であることに注意
    if (this.y < 0) this.y = 0; // 上端！
    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height; // 下端！
    }
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

  // 衝突判定
  isColliding(obj) {
    return (
      this.x < obj.x + obj.width && // （player左端）が（対象物右端）より左
      this.x + this.width > obj.x && // （player右端）が（対象物左端）より右
      this.y < obj.y + obj.height && // （player上端）が（対象物下端）より上
      this.y + this.height > obj.y // （player上端）が（対象物上端）より下
    );
  }

  // 衝突検知時処理
  handleCollision(obj) {
    if (obj.tipe === "food") {
      this.#increaseLife();
      return "food";
    } else if (obj.type === "obstacle") {
      this.#decreaselife();
      return "obstacle";
    }
    return null;
  }

  getLife() {
    return this.life;
  }

  // ライフ増加（Private）
  #increaseLife(amount = 1) {
    this.life = Math.min(3, this.life + amount); // 最大3
  }

  // ライフ減少（Private）
  #decreaselife(amount = 1) {
    this.life = Math.max(0, this.life - amount); // 最小０
  }
}
