const addBtn = document.getElementById("add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.getElementById("tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }
  const task = `
    <div class="task">
      <input type="checkbox" class="task-check">
      <span class="taskName">${taskName}</span>
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>`;

  tasksContainer.insertAdjacentHTML("beforeend", task);

  const deleteBtn = document.querySelectorAll(".task .delete");
  deleteBtn.forEach((btn) => {
    btn.onclick = () => {
      btn.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const editBtn = document.querySelectorAll(".task .edit");
  editBtn.forEach((editbtn) => {
    editbtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      if (!targetElement.previousElementSibling.previousElementSibling.checked) {
        taskCount -= 1;
        displayCount(taskCount);
      }
      newTaskInput.value = targetElement.previousElementSibling.innerText;
      targetElement.parentNode.remove();
    };
  });

  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
