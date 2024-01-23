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

  console.log(name, phone, email, message, "sdfd");

  fetch(
    "http://192.168.1.117:8082/api/v1/admin/telegram/send-message-to-group/",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Ошибка при выполнении запроса:", error);
    });
}
