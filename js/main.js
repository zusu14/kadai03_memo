// グローバル領域　main.js
// 初期表示時と画面サイズ変更時にGameクラスに通知する

const canvas = document.getElementById("gameCanvas");

// 画面サイズ変更時処理
function resizeCanvas() {
  const aspectRatio = 16 / 9;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (windowWidth / windowHeight > aspectRatio) {
    canvas.height = windowHeight;
    canvas.width = windowHeight * aspectRatio;
  } else {
    canvas.height = windowWidth / aspectRatio;
    canvas.width = windowWidth;
  }
}

// 初回起動時
resizeCanvas();
const game = new Game(canvas); // Gameクラスのインスタンス生成
game.updateCanvasSize(canvas.width, canvas.height); // Gameインスタンスにcanvasサイズを通知;

// ウィンドウサイズ変更時（イベントハンドラ、コールバック関数）
window.addEventListener("resize", () => {
  resizeCanvas();
  game.updateCanvasSize(canvas.width, canvas.height);
});

game.start();
