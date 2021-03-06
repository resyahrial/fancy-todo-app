const BASE_URL = "http://localhost:8080";

$(document).ready(() => {
  home();
  $("#add-todos").click(() => {
    $("#modal").removeClass("-translate-y-full").addClass("translate-y-4");
  });

  // navigation
  $("nav ul li").click(function (e) {
    e.preventDefault();
    const nav = this.children[0].innerText;
    clearContent();
    switch (nav) {
      case "Login":
        $("#login-form").show();
        break;
      case "Register":
        $("#register-form").show();
        break;
      default:
        localStorage.removeItem("access_token");
        const auth2 = gapi.auth2.getAuthInstance();
        auth2
          .signOut()
          .then(() => {
            console.log("User signed out.");
          })
          .catch((err) => {
            console.log(err);
          });
        home();
        break;
    }
  });
});

function showModal(event) {
  let todo = {};
  if (Object.keys(event.target.dataset).length !== 0) {
    todo = event.target.dataset;
  }

  $("#id").val(todo.id || "");
  $("#status").val(todo.status || "");
  $("#title").val(todo.title || "");
  $("#description").val(todo.description || "");
  $("#due_date").val(
    todo.due_date ? dayjs(todo.due_date).format("YYYY-MM-DD") : ""
  );
  $("#modal").removeClass("-translate-y-full").addClass("translate-y-4");
}

function hideModal() {
  $("#modal").addClass("-translate-y-full").removeClass("translate-y-4");
}

function home() {
  clearContent();
  if (localStorage.access_token) {
    $("nav ul li").children().hide();
    $("nav ul li").find(".logout").show();
    showTodo();
    return;
  }
  $("nav ul li").children().show();
  $("nav ul li").find(".logout").hide();
  quoteData();
}

function quoteData() {
  $.ajax({
    url: "http://localhost:8080",
    method: "GET",
  })
    .done((res) => {
      $("#content").append(`
        <div class="max-w-xl mx-auto py-8 px-4">
          <blockquote class="text-center leading-8 tracking-wide italic mb-4">
            "${res.text}"
          </blockquote>
          <p class="text-right text-accent font-semibold">~ ${res.author} ~</p>
        </div>
      `);
    })
    .fail(() => {
      swal({
        text: "Internal Server Error",
        icon: "error",
        timer: 1200,
        buttons: false,
      });
    });
}

// Create or Update
function saveTodo(event) {
  event.preventDefault();
  let textMessage = "Success add todo";
  let option = {
    url: `${BASE_URL}/todos`,
    method: "POST",
    headers: {
      access_token: localStorage.access_token,
    },
    data: {
      title: $("#title").val(),
      description: $("#description").val(),
      due_date: $("#due_date").val(),
      status: $("#status").val(),
    },
  };

  // if any id provided make option as PUT method
  if (event.target[0].value !== "") {
    textMessage = "Success edit todo";
    option = {
      ...option,
      url: `${BASE_URL}/todos/${$("#id").val()}`,
      method: "PUT",
    };
  }

  $.ajax(option)
    .done(() => {
      swal({
        text: textMessage,
        icon: "success",
        timer: 1200,
        buttons: false,
      });
    })
    .fail((err) => {
      swal({
        text: err.responseJSON.message,
        icon: "error",
        timer: 1200,
        buttons: false,
      });
    })
    .always(() => {
      $("#manipulate-todo")[0].reset();
      hideModal();
      home();
    });
}

// Read
function showTodo() {
  $("#add-todos").show();
  $("#todos").show();
  $.ajax({
    url: `${BASE_URL}/todos`,
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((res) => {
      $("#pending-todo").empty();
      $("#completed-todo").empty();
      let pendingCounter = 0,
        pendingContainer = [];
      completedCounter = 0;

      res.forEach((todo) => {
        if (todo.status) {
          completedCounter++;
          $("#completed-todo").append(getTodoTemplate(todo));
          return;
        }

        pendingCounter++;
        pendingContainer.push(todo);
      });

      pendingContainer.sort((a, b) => {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      });
      pendingContainer.forEach((todo) => {
        $("#pending-todo").append(getTodoTemplate(todo));
      });

      $("#pending-counter").text(pendingCounter);
      $("#completed-counter").text(completedCounter);
    })
    .fail((err) => {
      swal({
        text: err.responseJSON.message,
        icon: "error",
        timer: 1200,
        buttons: false,
      });
    })
    .always(() => {
      feather.replace();
    });
}

function getTodoTemplate(todo) {
  const { id, title, description, status, due_date } = todo;
  return `
    <div class="relative">
      <label
        class="todo-container block bg-secondary rounded-md py-2 pl-12 pr-16 relative mb-1 cursor-pointer group
          ${status ? "line-through text-secondary" : ""}"
      >
        ${title}
        <span class="text-accent text-xs ${status ? "hidden" : ""}">
          ${dayjs(due_date).fromNow()}
        </span><br>
        <span class="text-secondary text-xs ${status ? "hidden" : ""}">
          ${description}
        </span>
        <input
          type="checkbox"
          ${status ? "checked" : ""}
          class="absolute opacity-0 h-0 w-0"
          onchange="updateStatus(${id}, ${status})"
        />
        <span
          class="checkmark absolute top-2 left-3 h-6 w-6 border-2 border-accent rounded-md group-hover:bg-accent-dark group-hover:border-accent-dark"
        ></span>
        </label>
      <i
        data-feather="edit-3"
        class="absolute top-2 right-8 h-4 w-4 text-yellow-500 hover:text-yellow-700 z-10 cursor-pointer"
        onclick="showModal(event)"
        data-id="${id}"
        data-title="${title}"
        data-description="${description}"
        data-status="${status}"
        data-due_date="${due_date}"
      >
      </i>
      <i
        data-feather="trash-2"
        class="absolute top-2 right-2 h-4 w-4 text-red-500 hover:text-red-700 z-10 cursor-pointer"
        onclick="deleteTodo(${id})"
      >
      </i>
    </div>
  `;
}

// Update
function updateStatus(id, status) {
  $.ajax({
    url: `${BASE_URL}/todos/${id}`,
    method: "PATCH",
    headers: {
      access_token: localStorage.access_token,
    },
    data: {
      status: !status,
    },
  })
    .done(() => {
      home();
    })
    .fail((err) => {
      swal({
        text: err.responseJSON.message,
        icon: "error",
        timer: 1200,
        buttons: false,
      });
    });
}

// Delete
function deleteTodo(id) {
  $.ajax({
    url: `${BASE_URL}/todos/${id}`,
    method: "DELETE",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((res) => {
      swal({
        text: res.message,
        icon: "success",
        timer: 1200,
        buttons: false,
      });
      home();
    })
    .fail((err) => {
      swal({
        text: err.responseJSON.message,
        icon: "error",
        timer: 1200,
        buttons: false,
      });
    });
}

// auth - regular
function auth(event, type) {
  event.preventDefault();
  $.ajax({
    url: `${BASE_URL}/${type}`,
    method: "POST",
    data: {
      email: $(`#email-${type}`).val(),
      password: $(`#password-${type}`).val(),
    },
  })
    .done((res) => {
      if (type === "register") {
        alert("success", "Regsiter succesfully");
        return;
      }

      localStorage.setItem("access_token", res.accessToken);
      swal({
        text: "Login Succesfully",
        icon: "success",
        timer: 1200,
        buttons: false,
      });
    })
    .fail((err) => {
      swal({
        text: err.responseJSON.message,
        icon: "error",
        timer: 1200,
        buttons: false,
      });
    })
    .always(() => {
      home();
      $(`#form-${type}`)[0].reset();
    });
}

// auth - OAuth
function onSignIn(googleUser) {
  if (localStorage.access_token) {
    return;
  }

  $.ajax({
    url: `${BASE_URL}/oauth`,
    method: "POST",
    data: {
      token: googleUser.getAuthResponse().id_token,
    },
  })
    .done((res) => {
      localStorage.setItem("access_token", res.accessToken);
      swal({
        text: "Login Succesfully",
        icon: "success",
        timer: 1200,
        buttons: false,
      });
    })
    .fail((err) => {
      swal({
        text: err.responseJSON.message,
        icon: "error",
        timer: 1200,
        buttons: false,
      });
    })
    .always(() => {
      home();
    });
}

// helpers
function clearContent() {
  $("#content").children().hide();
}
