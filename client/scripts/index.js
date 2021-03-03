$(document).ready(() => {
  home();

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
        home();
        break;
    }
  });

  // login
  $("#form-login").submit((e) => {
    e.preventDefault();
    auth("login");
  });

  // register
  $("#form-register").submit((e) => {
    e.preventDefault();
    auth("register");
  });
});

function clearContent() {
  $("#content").children().hide();
  clearAlert();
}

function alert(type, message) {
  const classType = {
    success: "bg-blue-400",
    failed: "bg-red-400",
  };
  const alert = $("#alert");
  alert.addClass(`my-4 p-4 rounded-md shadow ${classType[type]}`);
  alert.text(message);

  setTimeout(() => {
    clearAlert();
  }, 2000);
}

function clearAlert() {
  const alert = $("#alert");
  alert.removeClass("my-4 p-4 rounded-md shadow bg-red-400 bg-blue-400");
  alert.empty();
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
    .fail((err) => {
      console.log(err);
      alert("failed", "Internal Server Error");
    });
}

function auth(type) {
  $.ajax({
    url: `http://localhost:8080/${type}`,
    method: "POST",
    data: {
      email: $(`#form-${type} div #email-${type}`).val(),
      password: $(`#form-${type} div #password-${type}`).val(),
    },
  })
    .done((res) => {
      $(`#form-${type}`)[0].reset();
      if (type === "register") {
        home();
        alert("success", "Regsiter succesfully");
        return;
      }

      alert("success", "Login succesfully");
      localStorage.setItem("access_token", res.accessToken);
      home();
      alert("success", "Login succesfully");
    })
    .fail((err) => {
      $(`#form-${type}`)[0].reset();
      alert("failed", err.responseJSON.message);
    });
}

function showTodo() {
  $.ajax({
    url: `http://localhost:8080/todos`,
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((res) => {
      const content = $("#content");
      if (res.length === 0) {
        content.append(
          `<h2 class="text-center text-2xl font-bold">Nothing to do</h2>`
        );
        return;
      }
      content.append(
        `<h2 class="text-center text-2xl font-bold">Any to do</h2>`
      );
    })
    .fail((err) => {
      $(`#form-${type}`)[0].reset();
      alert("failed", err.responseJSON.message);
    });
}
