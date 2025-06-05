// グローバル領域　main.js
// 初期表示時と画面サイズ変更時にGameクラスに通知する

const canvas = document.getElementById("gameCanvas");
const game = new Game(canvas); // Gameクラスのインスタンス生成

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

  // Gameインスタンスにcanvasサイズ変更を通知;
  game.updateCanvasSize(canvas.width, canvas.height);
}

window.addEventListener("resize", resizeCanvas); // リサイズ時　イベントリスナー登録
resizeCanvas(); // 初回起動時

game.start();
