const taskValue = document.getElementsByClassName("task_value")[0];
const taskSubmit = document.getElementsByClassName("task_submit")[0];
const taskList = document.getElementsByClassName("task_list")[0];
const liLen = localStorage.getItem("liLen");

//追加ボタンをクリックし、イベントを発動（タスクが追加）
taskSubmit.addEventListener("click", (evt) => {
  evt.preventDefault();
  const task = taskValue.value;
  addTasks(task);
  taskValue.value = "";
});

//追加ボタンを作成
const addTasks = (task) => {
  // 入力値が空の場合リターンを返す
  if (!task) {
    return;
  }
  // 入力したタスクを追加・表示
  const listItem = document.createElement("li");
  listItem.className = "listItems";
  const showItem = taskList.appendChild(listItem);
  showItem.innerHTML = task;

  //タスクに削除ボタンを付与
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteBtn";
  deleteButton.innerHTML = "Delete";
  listItem.appendChild(deleteButton);

  //削除ボタンをクリックし、イベントを発動（タスクが削除）
  deleteButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    deleteTasks(deleteButton);
  });
  // localStorageにデータを保存するメソッド
  SaveLocalStorageData();
};
// localStorageにデータを保存する
const SaveLocalStorageData = () => {
  const storageData = taskList.getElementsByClassName("listItems");
  // データが0件の場合localStorageのデータをリセットする
  if (storageData.length === 0) {
    localStorage.clear();
    return;
  }
  let str = "";
  for (let i = 0; i < storageData.length; i++) {
    localStorage.setItem("liLen", i);
    str = storageData[i].innerText;
    // buttonのテキストを削除
    str = str.replace("Delete", "");
    localStorage.setItem("key" + i, str);
  }
};

//削除ボタンにタスクを消す機能を付与
const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest("li");
  taskList.removeChild(chosenTask);
  SaveLocalStorageData();
};

// リロード時に以前の状態を維持する
if (liLen || liLen === 0) {
  for (let i = 0; i <= liLen; i++) {
    addTasks(localStorage.getItem("key" + i));
  }
}
