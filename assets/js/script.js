"use strict";
let todoList;

let localList = localStorage.getItem("myList");
localList = JSON.parse(localList);
if (localList === null) {
  todoList = [];
} else {
  todoList = localList;
}
let selectedDay = "shanbe";

// ------------------------display saturday list when page is reloaded-------------
const showSturdayList = () => {
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
}
showSturdayList();


// ------------------------getting task from user-------------

// show todolist
const showList = () => {
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
};

/// select days
let days = document.querySelectorAll(".day");
days.forEach((element) => {
  element.onclick = () => {
    selectedDay = element.id;
    showList();
  };
});
/// add task btn
const addBtn = document.querySelector("#add-btn");
addBtn.onclick = () => {
  const task = document.querySelector("#task").value;
  const time = document.querySelector("#time").value;
  save(task);
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

// localStorage.clear()

// --------------------------loginpage--------------
const loginBtn = document.querySelector('#login-btn');
loginBtn.onclick = () => {
  const name = document.querySelector('#name').value;
  const family = document.querySelector('#family').value;
  const phone = document.querySelector('#phone').value;
  if (name.length === 0 || family.length === 0) {
    alert('Please enter correct name')
  } else if (phone[0] != 0 || phone.length !== 11) {
    alert('Invalid phone number')
  } else {
    document.querySelector('.login-container').style.display = 'none'
  }
}

// --------------------------savepage--------------
function save(task) {
  document.querySelector('#save-text').placeholder = task;
  document.querySelector('.login-container').style.display = 'flex';
  document.querySelector('.login').style.display = 'none';
  document.querySelector('.save').style.display = 'flex';
  const saveBtn = document.querySelector('#save-btn');
  saveBtn.onclick = () => {
    document.querySelector('.login-container').style.display = 'none';
  }
}

