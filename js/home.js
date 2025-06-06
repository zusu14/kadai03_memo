function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // 初期化
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-11
  const lastDate = new Date(year, month + 1, 0).getDate(); // 当月最終日=次月0日目
  const firstDay = new Date(year, month, 1).getDay(); // 月初の曜日（0:日曜〜6:土曜）
  // ログ確認
  console.log(today);
  console.log(year);
  console.log(month);
  console.log(lastDate);
  console.log(firstDay);

  // 曜日位置調整
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div"); // 空白
    blank.className = "day";
    calendar.appendChild(blank);
  }

  // Local Storageから値取得
  for (let d = 1; d <= lastDate; d++) {
    // padStart(targetLength,[, padString]) padStringのデフォルトは""
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${d
      .toString()
      .padStart(2, "0")}`;
    const food = parseInt(localStorage.getItem(`food_${dateStr}`)) || 0; // テンプレートリテラル

    // 1日分の枠
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerHTML = `<div>${d}</div>`; // テンプレートリテラル

    // ドーナツ画像
    const donutDiv = document.createElement("div");
    donutDiv.className = "donuts";

    for (let i = 0; i < Math.min(food, 3); i++) {
      const img = document.createElement("img");
      img.src = "./images/donut.png";
      img.alt = "ドーナツ";
      donutDiv.appendChild(img);
    }

    dayDiv.appendChild(donutDiv);
    calendar.appendChild(dayDiv);
  }
}

function clearHistory() {
  if (confirm("本当にすべての獲得履歴を削除しますか？")) {
    for (let key in localStorage) {
      if (key.startsWith("food_")) {
        localStorage.removeItem(key);
      }
    }
    alert("履歴を削除しました。");
    renderCalendar(); // 再描画
  }
}

// 初期表示
renderCalendar();
