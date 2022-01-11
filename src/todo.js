const taskValue = document.getElementsByClassName("task_value")[0];
const taskSubmit = document.getElementsByClassName("task_submit")[0];
const taskList = document.getElementsByClassName("task_list")[0];
const compleateList = document.getElementsByClassName("compleate_list")[0];
const liLen = localStorage.getItem("liLen");
const num = localStorage.getItem("num");

//addtaskボタンをクリックし、イベントを発動（タスクが追加）
taskSubmit.addEventListener("click", (evt) => {
  evt.preventDefault();
  const task = taskValue.value;
  addTasks(task);
  taskValue.value = "";
});

//タスクを作成
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

  //タスクにcompleteボタンを付与
  const completeButton = document.createElement("button");
  completeButton.className = "completeBtn";
  completeButton.innerHTML = "Complete";
  listItem.appendChild(completeButton);

  //タスクにdeleteボタンを付与
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteBtn";
  deleteButton.innerHTML = "Delete";
  listItem.appendChild(deleteButton);

  //completeボタンをクリックし、イベントを発動（タスクが移動する）
  completeButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const completeList = evt.target.parentNode;
    completeTasks(completeButton, completeList);
  });
  //deleteボタンをクリックし、イベントを発動（タスクが削除）
  deleteButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    deleteTasks(deleteButton);
  });
  // localStorageにデータを保存するメソッド
  SaveLocalStorageData();
};
// localStorageにデータを保存する
const SaveLocalStorageData = () => {
  const compleateStorageData = compleateList.getElementsByClassName(
    "compleateList"
  );
  // データが0件の場合localStorageのデータをリセットする
  if (compleateStorageData.length === 0) {
    localStorage.removeItem("num");
    localStorage.removeItem("compleateKey" + 0);
  }
  let compleateStr = "";
  for (let i = 0; i < compleateStorageData.length; i++) {
    localStorage.setItem("num", i);
    compleateStr = compleateStorageData[i].innerText;
    localStorage.setItem("compleateKey" + i, compleateStr);
  }
  const storageData = taskList.getElementsByClassName("listItems");

  // データが0件の場合localStorageのデータをリセットする
  if (storageData.length === 0) {
    localStorage.removeItem("liLen");
    localStorage.removeItem("key" + 0);
    return;
  }

  let str = "";
  for (let i = 0; i < storageData.length; i++) {
    localStorage.setItem("liLen", i);
    str = storageData[i].innerText;
    // buttonのテキストを削除
    str = str.replace(/Delete|Complete/g, "");
    localStorage.setItem("key" + i, str);
  }
};

//completeボタンを押したらCompleatedに移動する機能を付与
const completeTasks = (completeButton, value) => {
  const compTask = completeButton.closest("li");
  taskList.removeChild(compTask);
  value = value.innerText;
  value = value.replace(/Delete|Complete/g, "");
  const text = value;
  const li = document.createElement("li");
  li.className = "compleateList";
  //作成したliタグにtextを追加
  li.innerText = text;
  compleateList.appendChild(li);

  SaveLocalStorageData();
};
//deleteボタンにタスクを消す機能を付与
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
// リロード時に以前の状態を維持する
if (num || num === 0) {
  for (let i = 0; i <= num; i++) {
    const text = localStorage.getItem("compleateKey" + i);
    const li = document.createElement("li");
    li.className = "compleateList";
    //作成したliタグにtextを追加
    li.innerText = text;
    compleateList.appendChild(li);
  }
}
//All Deleteボタンをクリックし、イベントを発動（completeタスクが全て削除）
const comp = document.getElementById("comp");
comp.addEventListener("click", (evt) => {
  evt.preventDefault();
  deletecomplete(evt);
  SaveLocalStorageData();
});
//All Deleteボタンにタスクを消す機能を付与
const deletecomplete = (comp) => {
  const deleteList = document.querySelector(".compleate_list");
  if (deleteList) {
    while (deleteList.lastChild) {
      deleteList.removeChild(deleteList.lastChild);
    }
  }
};
