window.onload = function () {
    loadTodos();

    document.getElementById("new").onclick = function () {
        let text = prompt("New TO DO:");
        if (text && text.trim() !== "") {
            addTodo(text);
            saveTodos();
        }
    };
};

function addTodo(text) {
    let div = document.createElement("div");
    div.textContent = text;

    div.onclick = function () {
        if (confirm("Remove this TO DO?")) {
            div.remove();
            saveTodos();
        }
    };

    let list = document.getElementById("ft_list");
    list.prepend(div); // สำคัญ: ต้องขึ้นบนสุด
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll("#ft_list div").forEach(div => {
        todos.push(div.textContent);
    });
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        if (c.startsWith("todos=")) {
            let data = JSON.parse(decodeURIComponent(c.split("=")[1]));
            data.reverse().forEach(todo => addTodo(todo));
        }
    }
}