var tagContainer = document.querySelector(".tag-container");
var taskContainer = document.querySelector(".task-list");
var modal = document.getElementById("add-tag-modal");
var doneButtons = document.querySelectorAll(".done-button");
var delButtons = document.querySelectorAll(".del-button");
var data, done, del;
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
var addTagModal = function () {
    console.log("click");
    if (modal.style.display == "none") {
        modal.style.display = "block";
    }
    else {
        modal.style.display = "none";
    }
};
// render the page first time
var renderPage = function () {
    data = JSON.parse(localStorage.getItem("data"));
    console.log("data: ", data);
    for (var i = 0; i <= data.length - 1; i++) {
        taskContainer.innerHTML += "\n        <div class=\"task\" >\n          <div class=\"task-info\">\n            <h2>".concat(data[i].task, "</h2>\n            <p class=\"tag\">").concat(data[i].tag, "</p>\n          </div>\n          <div class=\"action-button\">\n            <button class=\"done-button\">Done</button>\n            <button class=\"del-button\">Delete</button>\n          </div>\n        </div>\n    ");
    }
    document.getElementById("all-count").innerHTML = data.length;
    // just to display how many done and bin is having.
    done = JSON.parse(localStorage.getItem("done"));
    document.getElementById("done-count").innerHTML = done.length;
    del = JSON.parse(localStorage.getItem("del"));
    document.getElementById("del-count").innerHTML = del.length;
};
renderPage();
// CHECK FOR EVENT LISTENER FOR ALL BUTTONS
doneButtons = document.querySelectorAll(".done-button");
console.log("done button: ", doneButtons);
doneButtons.forEach(function (button, i) {
    button.addEventListener("click", function () { return doneTask(i); });
});
delButtons = document.querySelectorAll(".del-button");
console.log("del button: ", delButtons);
delButtons.forEach(function (button, i) {
    button.addEventListener("click", function () { return delTask(i); });
});
var Task = /** @class */ (function () {
    function Task(tag, task) {
        this.tag = tag;
        this.task = task;
    }
    return Task;
}());
// ADD NEW TASK
var addTask = function () {
    // get data from localStorage
    var taskList = [];
    taskList = JSON.parse(localStorage.getItem("data"));
    // get value from input and put it into array of object
    tag = document.getElementById("tag-name").value;
    task = document.getElementById("task-name").value;
    var taskNew = new Task(tag, task);
    taskList.push(taskNew);
    console.table(taskList);
    // update the new data into localstorage
    var new_data = JSON.stringify(taskList);
    console.log("New data: ", new_data);
    localStorage.setItem("data", new_data);
    console.log("local storage: ", localStorage);
    renderAll();
    location.reload();
};
// RENDER PAGE WITH SEARCH: ALL, DONE, BIN
var renderAll = function () {
    data = JSON.parse(localStorage.getItem("data"));
    console.log("data: ", data);
    taskContainer.innerHTML = ""; // reset the screen
    if (data.length == 0) {
        taskContainer.innerHTML = "<div>\n          <img src=\"Assets/awkward.jpeg\" alt=\"meme\" id=\"meme\" />\n          <p>Really? Not a single thing to do?</p>\n        </div>";
    }
    else {
        for (var i = 0; i <= data.length - 1; i++) {
            taskContainer.innerHTML += "\n        <div class=\"task\" >\n          <div class=\"task-info\">\n            <h2>".concat(data[i].task, "</h2>\n            <p class=\"tag\">").concat(data[i].tag, "</p>\n          </div>\n          <div class=\"action-button\">\n            <button class=\"done-button\">Done</button>\n            <button class=\"del-button\">Delete</button>\n          </div>\n        </div>\n    ");
        }
        document.getElementById("all-count").innerHTML = data.length;
        location.reload();
    }
};
var renderDone = function () {
    done = JSON.parse(localStorage.getItem("done"));
    console.log("done: ", done);
    taskContainer.innerHTML = "";
    if (done.length == 0) {
        taskContainer.innerHTML = "<div>\n          <img src=\"Assets/done.jpeg\" alt=\"meme\" id=\"meme\" />\n          <p>Nice job! Now go do something else!</p>\n        </div>";
    }
    else {
        for (var i = 0; i <= done.length - 1; i++) {
            taskContainer.innerHTML += "\n        <div class=\"task\">\n          <div class=\"task-info\">\n            <h2>".concat(done[i].task, "</h2>\n            <p class=\"tag\">").concat(done[i].tag, "</p>\n          </div>\n          \n        </div>\n    ");
        }
        taskContainer.innerHTML += "<button onclick=\"clearDone()\">Clear everything</button>";
    }
    document.getElementById("done-count").innerHTML = done.length;
};
var renderDel = function () {
    del = JSON.parse(localStorage.getItem("del"));
    console.log("del: ", del);
    taskContainer.innerHTML = "";
    if (del.length == 0) {
        taskContainer.innerHTML = "<div>\n          <img src=\"Assets/cleaning.jpeg\" alt=\"meme\" id=\"meme\" />\n          <p>What? You guys clean yo house?</p>\n        </div>";
    }
    else {
        for (var i = 0; i <= del.length - 1; i++) {
            taskContainer.innerHTML += "\n        <div class=\"task\" >\n          <div class=\"task-info\">\n            <h2>".concat(del[i].task, "</h2>\n            <p class=\"tag\">").concat(del[i].tag, "</p>\n          </div>\n          \n        </div>\n    ");
        }
        taskContainer.innerHTML += "<button onclick=\"clearDel()\">Clear everything</button>";
    }
    document.getElementById("del-count").innerHTML = del.length;
};
// BUTTON: DONE TASK AND TRANSFER TO DONE TAB
var doneTask = function (i) {
    console.log("done button no. ".concat(i, " was pressed"));
    // get data from localstorage, delete the pressed one and add back to local
    data = JSON.parse(localStorage.getItem("data"));
    var splice = data.splice(i, 1);
    console.log("splice: ", splice);
    var new_data = JSON.stringify(data);
    localStorage.setItem("data", new_data);
    var a = {};
    splice.forEach(function (x) {
        console.log("task: ", x.task, "tag: ", x.tag);
        return (a = { task: x.task, tag: x.tag });
    });
    done = JSON.parse(localStorage.getItem("done"));
    done.push(a);
    var new_done = JSON.stringify(done);
    localStorage.setItem("done", new_done);
    document.getElementById("done-count").innerHTML = done.length;
    renderAll();
    location.reload();
};
var clearDone = function () {
    localStorage.setItem("done", "[]");
    renderDone();
};
// DELETE TASK AND TRANSFER TO BIN
var delTask = function (i) {
    console.log("del button no. ".concat(i, " was pressed"));
    // get data from localstorage, delete the pressed one and add back to local
    data = JSON.parse(localStorage.getItem("data"));
    var splice = data.splice(i, 1);
    console.log("splice: ", splice);
    var new_data = JSON.stringify(data);
    localStorage.setItem("data", new_data);
    var a = {};
    splice.forEach(function (x) {
        console.log("task: ", x.task, "tag: ", x.tag);
        return (a = { task: x.task, tag: x.tag });
    });
    del = JSON.parse(localStorage.getItem("del"));
    del.push(a);
    var new_del = JSON.stringify(del);
    localStorage.setItem("del", new_del);
    document.getElementById("del-count").innerHTML = del.length;
    renderAll();
    location.reload();
};
var clearDel = function () {
    localStorage.setItem("del", "[]");
    renderDel();
};
// DATE AND TIME
var dt = new Date();
document.getElementById("datetime").innerHTML =
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
