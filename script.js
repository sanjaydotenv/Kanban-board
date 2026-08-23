const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const complete = document.querySelector("#complete");

const tasks = document.querySelectorAll(".task");

tasks.forEach((element) => {
  element.addEventListener("drag", (e) => {
  });
});

console.log(progress)
progress.addEventListener("dragenter" , () => {
    progress.classList.add("drag-animation")
})
progress.addEventListener("dragleave" , () => {
    progress.classList.remove("drag-animation")
})