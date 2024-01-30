function onSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (
    name.length < 3 ||
    phone.length < 3 ||
    email.length < 3 ||
    message.length < 3
  ) {
    return;
  }

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
  $(".form-btn").prop("disabled", true);
  fetch(
    "https://onaidocs.kz/api/v1/admin/telegram/send-message-to-group/",
    requestOptions
  )
    .then((response) => {
      const statusCode = response.status;
      $(".form-btn").prop("disabled", false);
      console.log(response);
      if (statusCode === 200) {
        showAlert("success");
        return response.json();
      } else {
        showAlert("failed");
      }
    })
    .catch((error) => {
      $(".form-btn").prop("disabled", false);
      console.log(error);
      clearForm();
      const phoneInput = document.getElementById("phone");

      IMask(phoneInput, {
        mask: "+7 (000) 000 00 00",
        lazy: false,
        placeholderChar: "_",
      });
    });
}

function onClickMobileMenu(event, type) {
  event.preventDefault();
  if (type === "close") return;

  $(".mobile-menu-btn").toggleClass("toggle");
  $(".mobile-menu").toggleClass("active");
}

var footerCount = 0;
var page1Count = 0;
var page2Count = 0;
var page3Count = 0;
var page4Count = 0;

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  let lastScroll = 0;

  gsap.from(".page-1-title", {
    duration: 0.7,
    y: -150,
    opacity: 0,
    ease: "back.out(2)",
  });
  gsap.from(".screen-onaidocs", {
    duration: 0.7,
    x: -150,
    opacity: 0,
    ease: "sine.inOut(2)",
  });
  gsap.from(".submit-application", {
    duration: 0.7,
    y: -150,
    opacity: 0,
    ease: "sine.inOut(2)",
  });

  // gsap.from(".page-1", { duration: 0.5, delay: 1, y: 50, opacity: 0 });

  var timeline = gsap.timeline({});

  timeline.from(".page-1-text", { x: -150, duration: 0.7, opacity: 0 });
  // .from(".submit-application", { y: -100, duration: 0.5, opacity: 0 });

  window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
      header.classList.add("shadow");
    } else {
      header.classList.remove("shadow");
    }

    lastScroll = currentScroll;

    const footer = document.querySelector(".footer");
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");
    const page4 = document.getElementById("page4");
    const footerPosition = footer.getBoundingClientRect();
    const page1Position = page1.getBoundingClientRect();
    const page2Position = page2.getBoundingClientRect();
    const page3Position = page3.getBoundingClientRect();
    const page4Position = page4.getBoundingClientRect();

    if (
      footerPosition.top <= window.innerHeight &&
      footerPosition.bottom >= 0 &&
      footerCount === 0
    ) {
      // The .footer element is in the viewport
      footerCount++;

      gsap.from(".footer-title", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "back.out(2)",
        stagger: 0.2,
      });

      let footerRightTimeline = gsap.timeline({});
      let footerLeftTimeline = gsap.timeline({});

      footerLeftTimeline
        .from(".footer-left-text", { x: -150, duration: 1, opacity: 0 })
        .from(".footer-left-address", { x: -150, duration: 1, opacity: 0 })
        .from(".reserved", { x: -150, duration: 1, opacity: 0 });

      footerRightTimeline
        .from(".form-input", {
          duration: 0.7,
          y: -50,
          opacity: 0,
          stagger: 0.2,
        })
        .from(".form-checkbox, .form-btn", { duration: 0.5, opacity: 0 });
      // Add your custom logic here
    }

    if (
      page2Position.top <= window.innerHeight &&
      page2Position.bottom >= 0 &&
      page2Count === 0
    ) {
      page2Count++;

      gsap.from(".page-2-title", {
        duration: 1,
        y: -150,
        opacity: 0,
        ease: "back.out(2)",
      });
      gsap.from(".left-block", { x: -150, duration: 1, opacity: 0 });
      gsap.from(".right-block", { x: 150, duration: 1, opacity: 0 });
    }
    if (
      page3Position.top <= window.innerHeight &&
      page3Position.bottom >= 0 &&
      page3Count === 0
    ) {
      page3Count++;

      gsap.from(".page-3-content", {
        duration: 1,
        y: -150,
        opacity: 0,
        ease: "back.out(2)",
      });
      gsap.from(".page-3-img", { x: 150, duration: 1, opacity: 0 });
    }
    if (
      page4Position.top <= window.innerHeight &&
      page4Position.bottom >= 0 &&
      page4Count === 0
    ) {
      page4Count++;

      gsap.from(".page-4-content-title", {
        duration: 1,
        y: -150,
        opacity: 0,
        ease: "back.out(2)",
      });
      gsap.from(".page-4-content-text", {
        duration: 1,
        y: -150,
        opacity: 0,
        ease: "back.out(2)",
      });
      gsap.from(".page-4-block-left", { x: -150, duration: 1, opacity: 0 });
      gsap.from(".page-4-block-right", { x: 150, duration: 1, opacity: 0 });
    }
  });

  $(".form-btn").prop("disabled", true);

  $(".checkbox-input").change(function () {
    if ($(this).is(":checked")) {
      $(".form-btn").prop("disabled", false);
    } else {
      $(".form-btn").prop("disabled", true);
    }
  });
});

function goFooter(event) {
  event.preventDefault();

  onClickMobileMenu(event, "close");

  const footer = document.getElementById("footer");
  footer.scrollIntoView({ behavior: "smooth" });
}

function goHome(event) {
  event.preventDefault();

  onClickMobileMenu(event);

  const page1 = document.getElementById("page1");
  page1.scrollIntoView({ behavior: "smooth" });
}

function servicesLink(event) {
  event.preventDefault();
  onClickMobileMenu(event);
  const page4 = document.getElementById("page4");
  page4.scrollIntoView({ behavior: "smooth" });
}

function onaidocsLink(event) {
  event.preventDefault();
  onClickMobileMenu(event);
  const page1 = document.getElementById("page1");
  page1.scrollIntoView({ behavior: "smooth" });
}

function aboutUsLink(event) {
  event.preventDefault();
  onClickMobileMenu(event);
  const page2 = document.getElementById("page2");
  page2.scrollIntoView({ behavior: "smooth" });
}

function showAlert(type) {
  document.getElementById("alert");
  $(".alert").addClass("active");
  $(".alert").addClass(type);

  // gsap.from(".alert", {
  //   duration: 1,
  //   x: 150,
  //   opacity: 0,
  //   ease: "back.out(2)",
  // });

  // setTimeout(function () {
  //   gsap.to(".alert", {
  //     duration: 1,
  //     x: 150,
  //     opacity: 0,
  //     ease: "back.in(2)",
  //   });
  //   alertTimeline.clear();
  // }, 3000);

  setupAlertAnimation();

  alertTimeline.play();

  setTimeout(function () {
    $(".alert").removeClass("active");
    $(".alert").removeClass(type);
  }, 4000);

  clearForm();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  document.getElementById("check1").checked = false;
}

var alertTimeline = gsap.timeline();

function setupAlertAnimation() {
  alertTimeline.clear();

  alertTimeline.from(".alert", {
    duration: 1,
    x: 150,
    opacity: 0,
    ease: "back.out(2)",
  });
  alertTimeline.to(".alert", {
    duration: 1,
    x: 150,
    opacity: 0,
    ease: "back.in(2)",
  });
}

const phoneInput = document.getElementById("phone");

IMask(phoneInput, {
  mask: "+7 (000) 000 00 00",
  lazy: false,
  placeholderChar: "_",
});
