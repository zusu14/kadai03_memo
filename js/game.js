class Game {
  // Initialize
  constructor(canvas) {
    this.canvas = canvas; // canavsインスタンス
    this.ctx = canvas.getContext("2d"); // canvasに描画を行うインターフェース
    this.player = new Player(50, 150); // スタート位置でPlayerインスタンス生成
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
    this.update(); // 状態を更新
    this.draw(); // 表示を更新
    // 次のフレームを予約（デフォルト60fps？）
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.update();
  }

  draw() {
    // 画面をクリアして背景を描く
    this.ctx.fillStyle = "#004466";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
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
document.addEventListener("keydown", function (e) {
  console.log("keyDown:", e.key);
});
