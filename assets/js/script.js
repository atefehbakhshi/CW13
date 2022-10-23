"use strict";
let todoList = [];

let selectedDay = "shanbe";

// check user exist
const userExist = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (user === null) {
    document.querySelector(".login-container").style.display = "flex";
  } else {
    document.querySelector(".login-container").style.display = "none";
    let username = localStorage.getItem("user");
    username = JSON.parse(username);
    document.getElementById("hello-text").innerText = "سلام " + username;
  }
}
userExist();

// update todo count
const updateNumber = (todoList) => {
  let days = document.querySelectorAll(".day");
  days.forEach((element) => {
    let count = 0;
    let temp = todoList.find((item) => item.day == element.id);
    if (temp != undefined) {
      count = temp.tasks.length;
    }
    element.querySelector(".task-num").innerText = count;
  });
};

// show todolist
const showList = () => {
  let localList = localStorage.getItem("myList");
  localList = JSON.parse(localList);
  if (localList === null) {
    todoList = [];
  } else {
    todoList = localList;
  }
  updateNumber(todoList);
  let todoBoxes = document.querySelectorAll(".todo-box");
  todoBoxes.forEach((item) => (item.style.display = "none"));
  if (todoList.find((item) => item.day === selectedDay) === undefined) return;
  let activeDay = todoList.find((item) => item.day === selectedDay).tasks;
  for (let i = 0; i < activeDay.length; i++) {
    let todoBox = document.querySelector(".todo-box").cloneNode(true);
    todoBox.style.display = "flex";
    todoBox.id = activeDay[i].id;
    todoBox.querySelector("#user-task").innerText = activeDay[i].taskName;
    todoBox.querySelector("#clock").innerText = activeDay[i].taskTime;

    let mainTitle = document.querySelector(".main-title");
    mainTitle.after(todoBox);
  }
  if (activeDay.length > 0) {
    todoBoxes.forEach((element) => {
      element.remove();
    });
  }

  const deleteBtns = document.querySelectorAll("#delete");
  deleteBtns.forEach((element) => {
    element.onclick = () => {
      deleteFunction(element);
    };
  });

  const editbtns = document.querySelectorAll("#edit");
  editbtns.forEach((element) => {
    element.onclick = () => {
      editFunction(element);
    };
  });
};

showList();

/// select days
let days = document.querySelectorAll(".day");
days.forEach((element) => {
  element.onclick = () => {
    selectedDay = element.id;
    changeDayBackground(days, selectedDay);
    showList();
  };
});
/// when page loaded, saturday is selected 
changeDayBackground(days, selectedDay);

/// add task btn
const addBtn = document.querySelector("#add-btn");
addBtn.onclick = () => {
  const task = document.querySelector("#task").value;
  const time = document.querySelector("#time").value;
  showSavePage(task);
  const saveBtn = document.querySelector("#save-btn");
  saveBtn.onclick = () => {
    document.querySelector(".login-container").style.display = "none";
    const newTask = {
      id: Date.now(),
      taskName: task,
      taskTime: time,
      isDone: false,
    };
    let tasksObject = {
      day: "",
      tasks: [],
    };

    if (todoList.find((item) => item.day === selectedDay) === undefined) {
      tasksObject.tasks.push({ ...newTask });
      tasksObject.day = selectedDay;
      todoList.push({ ...tasksObject });
    } else {
      let temp = todoList.find((item) => item.day === selectedDay);
      temp.tasks.push(newTask);
    }
    let wholeList = JSON.stringify(todoList);
    localStorage.setItem("myList", wholeList);

    document.querySelector("#task").value = "";
    document.querySelector("#time").value = "";

    showList();
  };

  const cancelBtn = document.querySelector("#cancel-btn");
  cancelBtn.onclick = () => {
    document.querySelector(".login-container").style.display = "none";
  };
};

// loginpage
const loginBtn = document.querySelector("#login-btn");
loginBtn.onclick = () => {
  const name = document.querySelector("#name").value;
  const family = document.querySelector("#family").value;
  const phone = document.querySelector("#phone").value;
  if (name.length === 0 || family.length === 0) {
    alert("Please enter correct name");
  } else if (phone[0] != 0 || phone.length !== 11) {
    alert("Invalid phone number");
  } else {
    document.querySelector(".login-container").style.display = "none";
    document.getElementById("hello-text").innerText = "سلام " + name;
    localStorage.setItem("user", JSON.stringify(name));
  }
};

// savepage
function showSavePage(task) {
  document.getElementById("save-text").value = task;
  document.querySelector(".login-container").style.display = "flex";
  document.querySelector(".login").style.display = "none";
  document.querySelector(".save").style.display = "flex";
}

// delete tasks
function deleteFunction(element) {
  let choosenTaskId = element.parentElement.parentElement.parentElement.id;
  const items = JSON.parse(localStorage.getItem("myList"));
  let updatedItems = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].day == selectedDay) {
      let tasks = items[i].tasks;
      const filteredTasks = tasks.filter((item) => item.id != choosenTaskId);
      tasks = [...filteredTasks];
      items[i].tasks = tasks;
      updatedItems.push(items[i]);
    } else {
      updatedItems.push(items[i]);
    }
  }
  localStorage.setItem("myList", JSON.stringify(updatedItems));
  showList();
}

// edit tasks
function editFunction(element) {
  let choosenTaskId = element.parentElement.parentElement.parentElement.id;
  let todoList = JSON.parse(localStorage.getItem("myList"));
  let temp = todoList.find((item) => item.day === selectedDay);
  let task = temp.tasks.find((t) => t.id == choosenTaskId);
  let index = temp.tasks.indexOf(task);
  showSavePage(temp.tasks[index].taskName);

  const saveBtn = document.querySelector("#save-btn");
  saveBtn.onclick = () => {
    document.querySelector(".login-container").style.display = "none";
    let newTaskName = document.getElementById("save-text").value;
    temp.tasks[index].taskName = newTaskName;
    // console.log(newTaskName);
    localStorage.setItem("myList", JSON.stringify(todoList));

    showList();
  };

  const cancelBtn = document.querySelector("#cancel-btn");
  cancelBtn.onclick = () => {
    document.querySelector(".login-container").style.display = "none";
  };
}

// change selected day's background
function changeDayBackground(days, selectedDay) {
  days.forEach(item => {
    item.style.cssText = `
      background-color:#d5d5d5;
      border: 1px solid black;`;
    let taskNum = item.querySelector('.task-num')
    taskNum.classList.remove('position')
  });
  let openTab = document.getElementById(selectedDay)
  openTab.querySelector('.task-num').classList.add('position');
  openTab.style.cssText = `
  background-color:white;
  border:none;
  `;
};


