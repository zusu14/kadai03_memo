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
    this.life = 3; // ライフ初期値
    this.spanInterval = 120; // 何フレーム毎に餌出現させるか（fps）
    this.frameCount = 0;
    this.birdsEvents(); // 入力イベントの登録（常に監視するため）
  }

  // 入力イベント
  birdsEvents() {
    // キーボードイベント（キー押下）
    // ※アロー関数使わない書き方　thisはグローバル変数で定義しなければならない
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
    if (this.isColliding(this.player, this.food)) {
      console.log("餌を取得！");
      this.life = Math.min(this.life + 1, 5); // ライフを加算（最大5）
      this.resetFood(); // 餌をリセット
    }
  }

  // 衝突判定
  isColliding(a, b) {
    return (
      a.x < b.x + b.width && // （player左端）が（対象物右端）より左
      a.x + a.width > b.x && // （player右端）が（対象物左端）より右
      a.y < b.y + b.height && // （player上端）が（対象物下端）より上
      a.y + a.height > b.y // （player上端）が（対象物上端）より下
    );
  }

  // 餌を再出現
  resetFood() {
    this.food = new Food(this.foodX, this.foodY);
  }

  draw() {
    // 画面をクリアして背景を描く
    this.ctx.fillStyle = "#004466";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.food.draw(this.ctx);
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
