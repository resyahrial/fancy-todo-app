$(document).ready(() => {
  const content = $("#content");
  content.children().hide();
  home();

  $("nav ul li").click(function (e) {
    e.preventDefault();
    const nav = this.children[0].innerText;
    $("#content").children().hide();
    switch (nav) {
      case "Login":
        $("#login-form").show();
        break;
      case "Register":
        $("#register-form").show();
        break;
      default:
        break;
    }
  });
});

function home() {
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
    });
}
