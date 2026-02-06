$(document).ready(function () {
    loadTodos();

    $("#new").on("click", function () {
        let text = prompt("New TO DO:");
        if (text && text.trim() !== "") {
            addTodo(text);
            saveTodos();
        }
    });
});

function addTodo(text) {
    let $div = $("<div></div>").text(text);

    $div.on("click", function () {
        if (confirm("Remove this TO DO?")) {
            $(this).remove();
            saveTodos();
        }
    });

    $("#ft_list").prepend($div); // สำคัญ: ต้องขึ้นบนสุด
}

function saveTodos() {
    let todos = [];

    $("#ft_list div").each(function () {
        todos.push($(this).text());
    });

    document.cookie =
        "todos=" +
        encodeURIComponent(JSON.stringify(todos)) +
        ";path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ");

    cookies.forEach(function (c) {
        if (c.startsWith("todos=")) {
            let data = JSON.parse(
                decodeURIComponent(c.split("=")[1])
            );

            data.reverse().forEach(function (todo) {
                addTodo(todo);
            });
        }
    });
}