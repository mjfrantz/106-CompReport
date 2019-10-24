var serverUrl = "http://restclass.azurewebsites.net/API2/Todos";

var Todos = [];

function createNew() {
    var text = $("#txtTest").val();

    // clear the text
    $("#txtTest").val("").focus();

    // (object literal)
    var todo = {
        text: text,
        user: "Mike",
        state: 0 // new
    };

    displayTodo(todo);


    // send the object to backend
    $.ajax({
        url: serverUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(todo),
        success: function (res) {
            console.log("server says:", res);
        },
        error: function (error) {
            console.error("Error saving", error);
        }
    });
}

/** Receives a TODO item and displays it on the corresponding list */
function displayTodo(todo) {

    if (todo.state == 0) {
        //create an item on the pending list
        var list = $("#todos"); 
        list.append(`<li id="${todo.id}" class="list-group-item"> ${todo.text} <button class="btn btn-outline-primary btn-sm float-right" onclick="markDone(${todo.id});" > Done </button>  </li>`);
    }
    else {
        // create an item on the done list
        var list = $("#doneTodos");
        list.append('<li class="list-group-item">' + todo.text + '</li>');
    }
}

function markDone(id) {
    console.log("Item done", id);

    $("#" + id).remove();

    // find on the todos array the one with the id = id
    for (let i = 0; i < Todos.length; i++) {
        if (Todos[i].id == id) {
            Todos[i].state = 1;
            displayTodo(Todos[i]);
        }
    }
}

function loadData() {
    // load data from backend
    // display todos
    $.ajax({
        url: serverUrl,
        type: "GET",
        success: function (res) {
            console.log("server responded");

            for (let i = 0; i < res.length; i++) {
                if (res[i].user == "Mike") {
                    console.log("This item is mine");

                    Todos.push(res[i]);
                    displayTodo(res[i]);
                }
            }
        },
        error: function (error) {
            console.error("Error getting data", error);
        }
    });
}

function init2() {
    // event binding
    // assign a function to click event
    $("#btnAdd").click(createNew);
    $("#txtTest").keypress(function (args) {
        if (args.keyCode == 13) {
            createNew();
        }
    });

    // display data
    loadData();

}

$(document).ready(init2);
