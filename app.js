//Script for Todos
const form = document.querySelector("#form");
const list = document.querySelector(".todo-list");

let todos = JSON.parse(localStorage.getItem("list2")) || [];
let temp = "";
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = form.elements.todo.value;
    if (task.trim() == "") {
        alert("Please Add A Valid Task!");
    } else {
        todos.push({
            text: task,
            complete: false,
        });
        render();
        updateLocalStorage();
    }
});

function render() {
    list.innerHTML = "";
    handleEmptyList();
    todos.map((todo, i) => {
        //@declaration 
        const input = document.createElement("input");
        const span = document.createElement("span");
        const deleteBtn = document.createElement("button");
        const li = document.createElement("li");

        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";
        span.classList.add("editable");
        span.contentEditable = "true";
        span.textContent = todo.text;
        input.type = "checkbox";

        //@tast checked
        input.addEventListener("change", handleChecked(span));

        //@description appending the new task
        li.setAttribute("id", `${i}`);
        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
        form.elements.todo.value = "";

        //@description delete task option
        deleteBtn.addEventListener("click", handleDelete());
    });

    function handleDelete() {
        console.log('handleDelete');
        return (e) => {
            const dlt = e.target.parentNode;
            let id = parseInt(dlt.getAttribute("id"));
            dlt.remove();
            todos = todos.filter((todo, i) => i !== id);
            updateLocalStorage();
        };
    }
    function handleEmptyList() {
        if (todos.length == 0) {
            const h3 = document.createElement("h3");
            h3.textContent = "Please add a task!";
            list.appendChild(h3);
        }
    }

    function handleChecked(span) {
        return (e) => {
            if (e.target.checked) {
                const chk = e.target.parentNode;
                let id = parseInt(chk.getAttribute("id"));
                todos.forEach((el, i) => {
                    if (i === id) {
                        el.complete = true;
                    }
                });
                span.classList.toggle("strike");
            } else {
                const chk = e.target.parentNode;
                let id = parseInt(chk.getAttribute("id"));
                todos.forEach((el, i) => {
                    if (i === id) {
                        el.complete = false;
                    }
                });
                span.classList.toggle("strike");
            }
            updateLocalStorage();
        };
    }
}

window.onload = () => render();

function updateLocalStorage() {
    localStorage.setItem("list2", JSON.stringify(todos));
}
