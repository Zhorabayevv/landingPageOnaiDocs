function onSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const data = {
    name,
    phone,
    email,
    message,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(
    "http://192.168.1.117:8082/api/v1/admin/telegram/send-message-to-group/",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      alert("Сообщение отправлено");
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("Ошибка при выполнении запроса:", error);
      alert("Сообщение отправлено");
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
      header.classList.add("shadow");
    } else {
      header.classList.remove("shadow");
    }

    lastScroll = currentScroll;
  });

  $(".form-btn").prop("disabled", true);

  $(".checkbox-input").change(function () {
    if ($(this).is(":checked")) {
      $(".form-btn").prop("disabled", false);
    } else {
      $(".form-btn").prop("disabled", true);
    }
  });

  $("div[class^='mobile-menu']").click(function () {
    $(".mobile-menu-btn").toggleClass("toggle");
    $(".mobile-menu").toggleClass("active");
  });
});
