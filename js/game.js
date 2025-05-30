class Game {
  // Initialize
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player = new Player(50, 150); // スタート位置でPlayerインスタンス生成
  }

  // gameLoop(),update(),draw()はゲーム開発定番の設計パターン
  start() {
    this.gameLoop();
  }

  gameLoop() {
    this.update(); // 状態を更新
    this.draw(); // 表示を更新
    // 次のフレームを予約（デフォルト60fpx？）
    // requestAnimationFrame(function () {
    //   this.gameLoop();
    // });
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

// グローバル変数
let game;

// ページ読み込み後にゲームスタート
window.onload = function () {
  // jQueryを用いた書き方
  //   const $canvas = $("#gameCanvas");
  //   const canvas = $canvas[0];

  // 純粋なJavaScript
  const canvas = document.getElementById("gameCanvas");
  game = new Game(canvas);
  game.start();
};

// キーボードイベント（キー押下）
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    game.player.moveUp();
  } else if (e.key === "ArrowDown") {
    game.player.moveDown();
  }
});

// キーボードイベント（キーを離した時）
document.addEventListener("keyup", function (e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    game.player.stop();
  }
});
