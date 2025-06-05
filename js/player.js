class Player {
  // Initialize
  constructor(canvasWidth, canvasHeight) {
    this.adaptToCanvasSize(canvasWidth, canvasHeight);
    this.dy = 0; // 縦方向移動速度
    this.life = 0; // ライフ初期値
    this.hitBoxMargin = 0.2; // ヒットボックス縮小用マージン

    // 画像の読み込み
    this.image = new Image(); // 組み込みクラス
    this.image.src = "./images/ootaka.png";

    // サイズ等パラメータ指定
    this.image.onload = () => {
      // onloadで読み込み後でないと取得できない
      this.aspectRatio = this.image.naturalWidth / this.image.naturalHeight; // 元画像のアスペクト比
      this.adaptToCanvasSize(canvasWidth, canvasHeight);
    };
  }

  // キャンバスサイズに合わせたパラメータ設定
  adaptToCanvasSize(w, h) {
    this.scale = 0.15;
    this.height = h * this.scale;
    this.width = this.height * this.aspectRatio;
    this.x = w * 0.15;
    this.y = h * 0.5 - this.height / 2;
    this.speed = h * 0.01;
  }

  setHitBox() {
    // ヒットボックス
    this.hitBoxX = this.x + (this.width * this.hitBoxMargin) / 2;
    this.hitBoxY = this.y + (this.height * this.hitBoxMargin) / 2;
    this.hitBoxW = this.width * (1 - this.hitBoxMargin);
    this.hitBoxH = this.height * (1 - this.hitBoxMargin);
  }

  update(canvasHeight) {
    this.y += this.dy; // 縦方向移動

    // 画面外に出ないように制限
    // 原点は左上であることに注意
    if (this.y < 0) this.y = 0; // 上端！
    if (this.y + this.height > canvasHeight * 0.9) {
      this.y = canvasHeight * 0.9 - this.height; // 下端！
    }

    // ヒットボックス計算
    this.setHitBox();
  }

  draw(ctx) {
    // 画像読み込みダブルチェック
    // 画像が読み込み未完了の場合は四角形を描写
    if (this.image.complete && this.image.naturalWidth != 0) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      // ヒットボックス（テスト用）
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.hitBoxX, this.hitBoxY, this.hitBoxW, this.hitBoxH);
    } else {
      return;
      // ctx.fillStyle = "white";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
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
    // 判定
    return (
      this.hitBoxX < obj.hitBoxX + obj.hitBoxW &&
      this.hitBoxX + this.hitBoxW > obj.hitBoxX &&
      this.hitBoxY < obj.hitBoxY + obj.hitBoxH &&
      this.hitBoxY + this.hitBoxH > obj.hitBoxY
    );
  }

  // 衝突検知時処理
  handleCollision(obj) {
    if (obj.type === "food") {
      this._increaseLife();
      return "food";
    } else if (obj.type === "obstacle") {
      this._decreaselife();
      return "obstacle";
    }
    return null;
  }

  getLife() {
    return this.life;
  }

  // ライフ増加（Private）
  _increaseLife(amount = 1) {
    this.life = Math.min(3, this.life + amount); // 最大3
  }

  // ライフ減少（Private）
  _decreaselife(amount = 1) {
    this.life = 0; // 障害物にぶつかったら0にする
    // this.life = Math.mthis.hitBoxX(0, this.life - amount); // 最小0
  }
}
