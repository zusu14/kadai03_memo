function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // 初期化
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.className = "day";
    calendar.appendChild(blank);
  }

  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${d
      .toString()
      .padStart(2, "0")}`;
    const food = parseInt(localStorage.getItem(`food_${dateStr}`)) || 0;

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerHTML = `<div>${d}</div>`;

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
