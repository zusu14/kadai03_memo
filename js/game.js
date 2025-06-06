class Game {
  // Initialize
  constructor(canvas) {
    this.canvas = canvas; // canavsインスタンス
    this.ctx = canvas.getContext("2d"); // canvasに描画を行うインターフェース

    // 各インスタンス生成
    this.background = new Background(this.canvas.width, this.canvas.height);
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.obstacle = new Obstacle(this.canvas.width, this.canvas.height, "food");

    this.spanInterval = 120; // 何フレーム毎に餌出現させるか（fps）
    this.frameCount = 0;
    this.birdsEvents(); // 入力イベントの登録（常に監視するため）

    // ライフ表示用
    this.lifeFullImage = new Image();
    this.lifeFullImage.src = "./images/donut.png";
    // this.lifeEmptyImage = new Image();
    // this.lifeEmptyImage.src = "./images/life_empty.png";

    // タイマー
    this.gameDuration = 30; // ゲーム時間30秒
    this.remainingTime = this.gameDuration;
    this.startTime = null;
    this.isGameEnded = false; // ゲーム終了フラグ
  }

  // ウィンドウサイズ変更時
  updateCanvasSize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    this.background.adaptToCanvasSize(this.width, this.height);
    this.obstacle.adaptToCanvasSize(this.width, this.height);
    this.player.adaptToCanvasSize(this.width, this.height);
  }

  // 入力イベント
  birdsEvents() {
    // キーボードイベント（キー押下）
    // ※アロー関数使わない書き方　thisは外側のインスタンスを自動的には引き継がない
    document.addEventListener(
      "keydown",
      function (e) {
        // console.log("keyDown");
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
      // console.log("keyUp");
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        this.player.stop();
      }
    });
  }

  // gameLoop(),update(),draw()はゲーム開発定番の設計パターン
  start() {
    this.startTime = Date.now();
    this.remainingTime = this.gameDuration;
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
    const elapsed = (Date.now() - this.startTime) / 1000; // 経過時間(ms)
    this.remainingTime = this.gameDuration - elapsed;

    // ゲーム終了時;
    if (this.isGameEnded === false && this.remainingTime <= 0) {
      this.endGame();
      return;
    }

    this.background.update();
    this.obstacle.update();
    this.player.update(this.height);

    // 衝突チェック
    if (this.player.isColliding(this.obstacle)) {
      console.log("衝突！");
      this.player.handleCollision(this.obstacle); // 衝突検出時処理
      // console.log("残ライフ：", this.player.life);

      // 餌ならリセット
      if (this.obstacle.type === "food") {
        this.resetObstacle();
      }
    }

    // 画面外へ出たらリセット
    if (this.obstacle.x + this.obstacle.width < 0) {
      this.resetObstacle();
    }
  }

  draw() {
    // 画面をクリアして背景を描く
    this.ctx.fillStyle = "#004466";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw(this.ctx);
    this.obstacle.draw(this.ctx);
    this.player.draw(this.ctx);
    this.drawLife();
  }

  // 餌出現
  resetObstacle() {
    this.obstacle = this.createRandomObstacle();
  }

  // 障害物ランダム生成
  createRandomObstacle() {
    const types = ["food", "house", "building", "frog", "helicopter"];
    const kind = types[Math.floor(Math.random() * types.length)];
    // const kind = types[0]; // テスト用
    return new Obstacle(this.canvas.width, this.canvas.height, kind);
  }

  // 獲得した餌表示
  drawLife() {
    const life = this.player.getLife();
    this.lifeScale = 0.08;
    this.lifeHeight = this.height * this.lifeScale;
    this.lifeWidth = this.lifeHeight;
    this.lifeX = this.width * 0.01;
    this.lifeY = this.height * 0.01;
    this.lifeSpacing = this.width * 0.01;

    for (let i = 0; i < life; i++) {
      // const img = i < life ? this.lifeFullImage : this.lifeEmptyImage;
      this.ctx.drawImage(
        this.lifeFullImage,
        this.lifeX + i * (this.lifeWidth + this.lifeSpacing),
        this.lifeY,
        this.lifeWidth,
        this.lifeHeight
      );
      console.log("life:", life);
    }
  }

  // 終了処理
  endGame() {
    this.isGameEnded = true;
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD形式

    // 既存の獲得数を取得（ない場合は0）
    const stored = localStorage.getItem(`food_${today}`);
    const alreadyCollected = stored ? parseInt(stored, 10) : 0;

    // 今回の獲得数（制限を考慮）
    const maxDaily = 3;
    const remaining = maxDaily - alreadyCollected;
    const newlyCollected = Math.min(this.player.life, remaining);

    // 保存
    const updatedTotal = alreadyCollected + newlyCollected;
    localStorage.setItem(`food_${today}`, updatedTotal);

    alert(
      `ゲーム終了！今回獲得できた餌：${newlyCollected}個\n本日の合計：${updatedTotal}個（最大${maxDaily}個）`
    );

    // ホーム画面に移動
    window.location.href = "index.html";
  }
}
