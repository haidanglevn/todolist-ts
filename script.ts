let tagContainer = document.querySelector(".tag-container");
let taskContainer = document.querySelector(".task-list");
let modal = document.getElementById("add-tag-modal");
let doneButtons = document.querySelectorAll(".done-button");
let delButtons = document.querySelectorAll(".del-button");
let data, done, del;

// if there is no data at the start, give it a empty array
if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", "[]");
}
if (localStorage.getItem("done") == null) {
  localStorage.setItem("done", "[]");
}
if (localStorage.getItem("del") == null) {
  localStorage.setItem("del", "[]");
}

// turn on/off the modal for add task
const addTagModal = () => {
  console.log("click");
  if (modal!.style.display == "none") {
    modal!.style.display = "block";
  } else {
    modal!.style.display = "none";
  }
};

// render the page first time
const renderPage = () => {
  data = JSON.parse(localStorage.getItem("data")!);
  console.log("data: ", data);
  for (let i = 0; i <= data.length - 1; i++) {
    taskContainer!.innerHTML += `
        <div class="task" >
          <div class="task-info">
            <h2>${data[i].task}</h2>
            <p class="tag">${data[i].tag}</p>
          </div>
          <div class="action-button">
            <button class="done-button">Done</button>
            <button class="del-button">Delete</button>
          </div>
        </div>
    `;
  }
  document.getElementById("all-count")!.innerHTML = data.length;
  // just to display how many done and bin is having.
  done = JSON.parse(localStorage.getItem("done")!);
  document.getElementById("done-count")!.innerHTML = done.length;
  del = JSON.parse(localStorage.getItem("del")!);
  document.getElementById("del-count")!.innerHTML = del.length;
};
renderPage();

// CHECK FOR EVENT LISTENER FOR ALL BUTTONS
doneButtons = document.querySelectorAll(".done-button");
console.log("done button: ", doneButtons);
doneButtons.forEach((button, i) => {
  button.addEventListener("click", () => doneTask(i));
});
delButtons = document.querySelectorAll(".del-button");
console.log("del button: ", delButtons);
delButtons.forEach((button, i) => {
  button.addEventListener("click", () => delTask(i));
});

class Task {
  constructor(tag: string, task: string) {
    this.tag = tag;
    this.task = task;
  }
}
// ADD NEW TASK
const addTask = () => {
  // get data from localStorage
  let taskList = [];
  taskList = JSON.parse(localStorage.getItem("data"));

  // get value from input and put it into array of object
  tag = document.getElementById("tag-name").value;
  task = document.getElementById("task-name").value;
  let taskNew : any[] = new Task(tag, task);
  taskList.push(taskNew);
  console.table(taskList);

  // update the new data into localstorage
  let new_data = JSON.stringify(taskList);
  console.log("New data: ", new_data);

  localStorage.setItem("data", new_data);
  console.log("local storage: ", localStorage);

  renderAll();
  location.reload();
};

// RENDER PAGE WITH SEARCH: ALL, DONE, BIN
const renderAll = () => {
  data = JSON.parse(localStorage.getItem("data")!);
  console.log("data: ", data);
  taskContainer!.innerHTML = ""; // reset the screen
  if (data.length == 0) {
    taskContainer!.innerHTML = `<div>
          <img src="Assets/awkward.jpeg" alt="meme" id="meme" />
          <p>Really? Not a single thing to do?</p>
        </div>`;
  } else {
    for (let i = 0; i <= data.length - 1; i++) {
      taskContainer!.innerHTML += `
        <div class="task" >
          <div class="task-info">
            <h2>${data[i].task}</h2>
            <p class="tag">${data[i].tag}</p>
          </div>
          <div class="action-button">
            <button class="done-button">Done</button>
            <button class="del-button">Delete</button>
          </div>
        </div>
    `;
    }
    document.getElementById("all-count")!.innerHTML = data.length;
    location.reload();
  }
};

const renderDone = () => {
  done = JSON.parse(localStorage.getItem("done")!);
  console.log("done: ", done);
  taskContainer!.innerHTML = "";
  if (done.length == 0) {
    taskContainer!.innerHTML = `<div>
          <img src="Assets/done.jpeg" alt="meme" id="meme" />
          <p>Nice job! Now go do something else!</p>
        </div>`;
  } else {
    for (let i = 0; i <= done.length - 1; i++) {
      taskContainer!.innerHTML += `
        <div class="task">
          <div class="task-info">
            <h2>${done[i].task}</h2>
            <p class="tag">${done[i].tag}</p>
          </div>
          
        </div>
    `;
    }
    taskContainer!.innerHTML += `<button onclick="clearDone()">Clear everything</button>`;
  }
  document.getElementById("done-count")!.innerHTML = done.length;
};

const renderDel = () => {
  del = JSON.parse(localStorage.getItem("del")!);
  console.log("del: ", del);
  taskContainer!.innerHTML = "";
  if (del.length == 0) {
    taskContainer!.innerHTML = `<div>
          <img src="Assets/cleaning.jpeg" alt="meme" id="meme" />
          <p>What? You guys clean yo house?</p>
        </div>`;
  } else {
    for (let i = 0; i <= del.length - 1; i++) {
      taskContainer!.innerHTML += `
        <div class="task" >
          <div class="task-info">
            <h2>${del[i].task}</h2>
            <p class="tag">${del[i].tag}</p>
          </div>
          
        </div>
    `;
    }
    taskContainer!.innerHTML += `<button onclick="clearDel()">Clear everything</button>`;
  }
  document.getElementById("del-count")!.innerHTML = del.length;
};

// BUTTON: DONE TASK AND TRANSFER TO DONE TAB
const doneTask = (i) => {
  console.log(`done button no. ${i} was pressed`);
  // get data from localstorage, delete the pressed one and add back to local
  data = JSON.parse(localStorage.getItem("data")!);
  let splice = data.splice(i, 1);
  console.log("splice: ", splice);
  let new_data = JSON.stringify(data);
  localStorage.setItem("data", new_data);
  let a = {};
  splice.forEach((x) => {
    console.log("task: ", x.task, "tag: ", x.tag);
    return (a = { task: x.task, tag: x.tag });
  });

  done = JSON.parse(localStorage.getItem("done")!);
  done.push(a);
  let new_done = JSON.stringify(done);
  localStorage.setItem("done", new_done);
  document.getElementById("done-count")!.innerHTML = done.length;
  renderAll();
  location.reload();
};

const clearDone = () => {
  localStorage.setItem("done", "[]");
  renderDone();
};

// DELETE TASK AND TRANSFER TO BIN
const delTask = (i) => {
  console.log(`del button no. ${i} was pressed`);
  // get data from localstorage, delete the pressed one and add back to local
  data = JSON.parse(localStorage.getItem("data")!);
  let splice = data.splice(i, 1);
  console.log("splice: ", splice);
  let new_data = JSON.stringify(data);
  localStorage.setItem("data", new_data);
  let a = {};
  splice.forEach((x) => {
    console.log("task: ", x.task, "tag: ", x.tag);
    return (a = { task: x.task, tag: x.tag });
  });

  del = JSON.parse(localStorage.getItem("del")!);
  del.push(a);
  let new_del = JSON.stringify(del);
  localStorage.setItem("del", new_del);
  document.getElementById("del-count")!.innerHTML = del.length;
  renderAll();
  location.reload();
};

const clearDel = () => {
  localStorage.setItem("del", "[]");
  renderDel();
};

// DATE AND TIME
var dt = new Date();
document.getElementById("datetime")!.innerHTML =
  ("0" + dt.getDate()).slice(-2) +
  "." +
  ("0" + (dt.getMonth() + 1)).slice(-2) +
  "." +
  dt.getFullYear() +
  " " +
  ("0" + dt.getHours()).slice(-2) +
  ":" +
  ("0" + dt.getMinutes()).slice(-2);
// CREDIT: https://www.arclab.com/en/kb/htmlcss/display-date-time-javascript-php-ssi.html
