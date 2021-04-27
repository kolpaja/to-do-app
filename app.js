//Script for Todos
const form = document.querySelector("#form");
const todo = document.querySelector("#form");
const list = document.querySelector(".todo-list")
let todos = JSON.parse(localStorage.getItem("list2")) || [];
console.log('todsdaas: ', todos);
let temp = ''
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = form.elements.todo.value;
    if (task == '') {
        alert('Please Add A Valid Task!')
    } else {    
    todos.push(
        {
            text: task,
            complete: false,
        });    
            render();
    localStorage.setItem('list2', JSON.stringify(todos));
    }
})

function render() {
    list.innerHTML = '';
    todos.map((todo,i) => {
    const input = document.createElement('input');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    h3.textContent= "Please add a task!"
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = "Delete";
    span.classList.add('editable');
    span.contentEditable = "true";
    span.textContent = todo.text;
    input.type = "checkbox";
    input.addEventListener('change', (e) => {
        if (e.target.checked) {
            let s = document.createElement('s');
            temp = span.textContent;
            s.innerText = span.textContent;
            console.log('checked, temp: ', temp);
            span.textContent = '';
            span.append(s);
        } else {
            span.textContent = temp;
        }
    });
    li.setAttribute('id', `${i}`);
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    form.elements.todo.value = '';

    //@description delete task option
        deleteBtn.addEventListener('click', (e) => {
            const dlt = e.target.parentNode;
            console.log('id:', dlt.getAttribute('id'));
            let id = parseInt(dlt.getAttribute('id'));
            dlt.remove();
            todos = todos.filter((todo, i) => i !== id)
            localStorage.setItem('list2', JSON.stringify(todos));
            if (todos.length == 0) {
             console.log(h3);
            console.log('todos length: ', todos.length);
        }
    });
    })
}

window.onload = () => render();