const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const complete = document.querySelector("#complete");
const addNewTask = document.querySelector(".addNewTask button");
const overlay = document.querySelector(".overlay");
const bg = document.querySelector(".bg");
const createTaskBtn = document.querySelector(".createBtn");
const titleInput = document.querySelector(".addtask input");
const textareaInput = document.querySelector(".addtask textarea");
const tasks = document.querySelectorAll(".task");
const changeTheme = document.querySelector(".icon");
const themeIcon = document.querySelector(".icon");

let dragElement = null;
const allTasksData = {};

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));

  for (const cool in data) {
    data[cool].forEach((task) => {
      renderTask(task.title, task.description, cool);
    });
  }
}

function claculateCount() {
  const tasks = [todo, progress, complete];

  tasks.forEach((el) => {
    const task = el.querySelectorAll(".task");
    const count = el.querySelector(".count");

    allTasksData[el.id] = Array.from(task).map((e) => {
      return {
        title: e.querySelector("h2").innerHTML,
        description: e.querySelector("p").innerHTML,
      };
    });

    localStorage.setItem("tasks", JSON.stringify(allTasksData));
    count.innerHTML = task.length;
  });
}

tasks.forEach((element) => {
  element.addEventListener("drag", (e) => {
    dragElement = element;
  });
});

function onDragEvnet(column) {
  column.addEventListener("dragenter", () => {
    column.classList.add("drag-animation");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-animation");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log(column, dragElement);
    column.append(dragElement);
    column.classList.remove("drag-animation");
    claculateCount();
  });
}

onDragEvnet(todo);
onDragEvnet(progress);
onDragEvnet(complete);

addNewTask.addEventListener("click", () => {
  overlay.style.display = "flex";
});

bg.addEventListener("click", () => {
  overlay.style.display = "none";
});

function renderTask(title, textarea, where = "todo") {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `<h2>${title}</h2>
                <p>${textarea}</p>
                <button class="delete-btn">Delete</button>
                `;

  if (where === "todo") {
    todo.append(div);
  } else if (where === "progress") {
    progress.append(div);
  } else {
    complete.append(div);
  }

  div.addEventListener("drag", () => {
    dragElement = div;
  });

  const deleteBtn = div.querySelector("button");

  deleteBtn.addEventListener("click", () => {
    div.remove();

    claculateCount();
  });
  claculateCount();
}

createTaskBtn.addEventListener("click", () => {
  const titleValue = titleInput.value;
  const textareaValue = textareaInput.value;

  renderTask(titleValue, textareaValue);
  titleValue.textContent = "";
  textareaValue.textContent = "";
  overlay.style.display = "none";
});

function changeThemee() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeIcon.innerHTML = `<i class="ri-moon-fill"></i>`;
  } else {
    document.body.classList.remove("light");
    themeIcon.innerHTML = `<i class="ri-sun-line"></i>`;
  }

  changeTheme.addEventListener("click", () => {
    if (!document.body.classList.contains("light")) {
      document.body.classList.add("light");
      themeIcon.innerHTML = `<i class="ri-moon-fill"></i>`;
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      themeIcon.innerHTML = `<i class="ri-sun-line"></i>`;
      localStorage.setItem("theme", "dark");
    }
  });
}
changeThemee();
