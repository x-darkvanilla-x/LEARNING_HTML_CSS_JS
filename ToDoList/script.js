/*
	Linkedin : Dipesh Adelkar
    Instagram : @x_darkvanilla_x 
    Github : @x-darkvanilla-x 
*/

let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
			<button onclick="editTask(${index})" class="edit"><i class="fas fa-pen"></i></button>
            <button onclick="deleteTask(${index})" class="del"><i class="fas fa-trash"></i></button>
            <span><b>${task.taskText}</b></span>
            <span> - ${task.date}</span>
            <span> - ${task.time}</span>
        `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");
  const taskText = taskInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  if (taskText !== "" && date !== "" && time !== "") {
    const task = {
      taskText: taskText,
      date: date,
      time: time,
    };
    tasks.push(task);
    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    renderTasks();
  }

  var today = new Date().toISOString().split("T")[0];

  document.getElementById("dateInput").value = today;

  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");

  var currentTime = hours + ":" + minutes;

  document.getElementById("timeInput").value = currentTime;
}

function editTask(index) {
  const newTaskText = prompt("Edit Task", tasks[index].taskText);
  if (newTaskText !== null) {
    tasks[index].taskText = newTaskText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  const taskList = document.getElementById("taskList");
  const tasksElement = taskList.getElementsByTagName("li");

  tasksElement[index].classList.add("fade-out");

  setTimeout(() => {
    tasks.splice(index, 1);
    renderTasks();
  }, 300); 
}

renderTasks();

document
  .getElementById("taskInput")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      addTask();
    }
});