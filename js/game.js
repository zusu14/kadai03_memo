class Game {
  // Initialize
  constructor(canvas) {
    this.canvas = canvas; // canavsインスタンス
    this.ctx = canvas.getContext("2d"); // canvasに描画を行うインターフェース

    // 初期位置　それぞれのクラス内部に定義するのもありだが、一旦ここ
    this.playerX = this.canvas.width * 0.1; // 左から10%
    this.playerY = this.canvas.height * 0.5 - 20; // 上下中央
    this.foodX = this.canvas.width * 0.9; // 右から10%
    this.foodY = this.canvas.height * 0.8; // 下から20%

    this.player = new Player(this.playerX, this.playerY); // スタート位置でPlayerインスタンス生成
    // this.foods = []; // 餌の配列
    this.food = new Food(this.foodX, this.foodY); // 餌単体

    this.spanInterval = 120; // 何フレーム毎に餌出現させるか（fps）
    this.frameCount = 0;
    this.birdsEvents(); // 入力イベントの登録（常に監視するため）

    // 表示用
    this.lifeFullImage = new Image();
    this.lifeFullImage.src = "./images/life_full.png";
    this.lifeEmptyImage = new Image();
    this.lifeEmptyImage.src = "./images/life_empty.png";
  }

  // 入力イベント
  birdsEvents() {
    // キーボードイベント（キー押下）
    // ※アロー関数使わない書き方　thisは外側のインスタンスを自動的には引き継がない
    document.addEventListener(
      "keydown",
      function (e) {
        console.log("keyDown");
        if (e.key === "ArrowUp") {
          this.player.moveUp();
        } else if (e.key === "ArrowDown") {
          this.player.moveDown();
        }
      }.bind(this) //thisがGameインスタンスであることを明示
    );

    // キーボードイベント（キーを離した時）
    // アロー関数（ES6以降はこっち推奨。thisは外側のインスタンスを引き継ぐ）
    document.addEventListener("keyup", (e) => {
      console.log("keyUp");
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        this.player.stop();
      }
    });
  }

  // gameLoop(),update(),draw()はゲーム開発定番の設計パターン
  start() {
    this.gameLoop();
  }

  gameLoop() {
    try {
      this.update(); // 状態を更新
      this.draw(); // 表示を更新
    } catch (e) {
      console.error("gameLoop() error:", e);
    }
    // 次のフレームを予約（デフォルト60fps？）
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.update();
    // this.foods.forEach((food) => food.update());
    this.food.update();

    // 衝突チェック
    if (this.player.isColliding(this.food)) {
      console.log("衝突！");
      this.player.handleCollision(this.food); // 衝突検出時処理
      // console.log("残ライフ：", this.player.life);
      this.resetFood(); // 餌出現　★★★
    }
  }

  draw() {
    // 画面をクリアして背景を描く
    this.ctx.fillStyle = "#004466";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx); // プレイヤー表示
    this.food.draw(this.ctx); // 餌表示
    this.drawLife(); // ライフ表示
  }

  // 餌出現
  resetFood() {
    this.food = new Food(this.foodX, this.foodY);
  }

  // ライフ表示
  drawLife() {
    const life = this.player.getLife();
    const lifeX = 20;
    const lifeY = 20;
    const spacing = 10;
    const size = 24;

    for (let i = 0; i < 3; i++) {
      const img = i < life ? this.lifeFullImage : this.lifeEmptyImag;
      this.ctx.drawImage(img, lifeX + i * (size + spacing), lifeY, size, size);
      console.log("life:", life);
    }
  }
}

// ページ読み込み後にゲームスタート
window.onload = function () {
  // jQueryを用いた書き方
  //   const $canvas = $("#gameCanvas");
  //   const canvas = $canvas[0];

  // 純粋なJavaScript
  const canvas = document.getElementById("gameCanvas");
  console.log(canvas);
  const game = new Game(canvas);
  game.start();
};
