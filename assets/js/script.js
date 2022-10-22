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
