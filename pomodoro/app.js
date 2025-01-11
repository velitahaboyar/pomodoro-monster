document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todo-form");
  const newTaskInput = document.getElementById("new-task");
  const taskTimeInput = document.getElementById("task-time");
  const inProgressTasksList = document.getElementById("in-progress-list");
  const completedTasksList = document.getElementById("completed-tasks-list");
  const inProgressCount = document.getElementById("in-progress-count");
  const completedCount = document.getElementById("completed-count");
  const timerButtons = document.querySelectorAll(".timer-setting-btn");
  const startButton = document.getElementById("start-timer");
  const pauseButton = document.getElementById("pause-timer");
  const resetButton = document.getElementById("reset-timer");
  const timerDisplay = document.getElementById("timer");
  let timer;
  let isRunning = false;
  let selectedTime = 1500;

  // task ekleme, tamamlama ve sayaç güncelleme fonksiyonları
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskName = newTaskInput.value.trim();
    const taskTime = taskTimeInput.value;

    if (taskName) {
      addTask(taskName, taskTime);
      newTaskInput.value = "";
      taskTimeInput.value = "";
      updateCounters();
    }
  });

  function addTask(name, time) {
    const taskItem = document.createElement("li");
    taskItem.textContent = name + (time ? " - " + time : "");
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.className = "complete-btn";
    completeButton.addEventListener("click", function () {
      completeTask(taskItem);
    });
    taskItem.appendChild(completeButton);
    inProgressTasksList.appendChild(taskItem);
  }

  function completeTask(taskItem) {
    completedTasksList.appendChild(taskItem);
    taskItem.classList.add("completed");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", function () {
      taskItem.remove();
      updateCounters();
    });
    taskItem.appendChild(deleteButton);
    taskItem.removeChild(taskItem.querySelector(".complete-btn"));
    updateCounters();
  }

  function updateCounters() {
    inProgressCount.textContent = inProgressTasksList.children.length;
    completedCount.textContent = completedTasksList.children.length;
  }

  // sayaç butonları için event listernerlar
  timerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const newTime = parseInt(this.dataset.time);
      selectedTime = newTime;
      displayTimeLeft(newTime);
      updateBackgroundColor(newTime);
      if (isRunning) {
        pauseTimer();
      }
    });
  });

  startButton.addEventListener("click", function () {
    if (!isRunning) {
      startTimer(selectedTime);
    }
  });

  pauseButton.addEventListener("click", pauseTimer);

  resetButton.addEventListener("click", function () {
    resetTimer();
  });

  function startTimer(seconds) {
    isRunning = true;
    let endTime = Date.now() + seconds * 1000;
    displayTimeLeft(seconds);

    timer = setInterval(() => {
      const secondsLeft = Math.round((endTime - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(timer);
        isRunning = false;
        timerDisplay.textContent = "Time's up!";
        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    displayTimeLeft(selectedTime);
    updateBackgroundColor(selectedTime);
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = `Time Left: ${display}`;
  }

  function updateBackgroundColor(time) {
    let color = "rgb(18, 18, 18)";
    if (time === 1500 || time === 2400 || time === 3600) {
      color = "rgb(18, 18, 18)";
    } else if (time === 300) {
      color = "rgb(56, 133, 138)";
    } else if (time === 900) {
      color = "rgb(57, 112, 151)";
    }
    changeBackgroundColor(color);
  }

  function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  displayTimeLeft(selectedTime);
  updateBackgroundColor(selectedTime);
});

// chat buton
document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.getElementById("sidebar");
  var toggleButton = document.createElement("button");

  toggleButton.innerText = "☰ Chat";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "110px";
  toggleButton.style.left = "0";
  toggleButton.style.zIndex = "1001";
  toggleButton.style.padding = "10px";
  toggleButton.style.backgroundColor = "#333";
  toggleButton.style.color = "white";
  toggleButton.style.border = "none";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.borderRadius = "10%";

  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
