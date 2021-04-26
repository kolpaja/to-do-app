//Script for Todos
const form = document.querySelector("#form");
const todo = document.querySelector("#form");
const list = document.querySelector(".todo-list");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = form.elements.todo.value;
    console.log(task);
    //! important form the elements to have the attribute named so we can access it. todo is the name attibute of the input so we can access
    const li = document.createElement('li');
    
    li.textContent = task;
    console.log('inside form submit: li: ',li);
    list.appendChild(li)
    form.elements.todo.value = '';
})