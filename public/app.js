document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const toggleIcon = document.getElementById("toggleIcon");

  // Handle click to toggle sidebar
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");

    // Save the current state
    const isClosed = sidebar.classList.contains("close");
    localStorage.setItem("sidebarClosed", isClosed.toString());

    if (isClosed) {
      toggleIcon.classList.remove("bx-chevrons-left");
      toggleIcon.classList.add("bx-chevrons-right");
    } else {
      toggleIcon.classList.remove("bx-chevrons-right");
      toggleIcon.classList.add("bx-chevrons-left");
    }
  });

  // On page load, restore the sidebar state
  const savedState = localStorage.getItem("sidebarClosed") === "true";
  if (savedState) {
    sidebar.classList.add("close");
    toggleIcon.classList.remove("bx-chevrons-left");
    toggleIcon.classList.add("bx-chevrons-right");
  } else {
    sidebar.classList.remove("close");
    toggleIcon.classList.remove("bx-chevrons-right");
    toggleIcon.classList.add("bx-chevrons-left");
  }
});


  // // CHART JS
  // const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
  // const yValues = [55, 49, 44, 24, 15];
  // const barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

  // if (document.getElementById("myChart")) {
  //   new Chart("myChart", {
  //     type: "pie",
  //     data: {
  //       labels: xValues,
  //       datasets: [{
  //         backgroundColor: barColors,
  //         data: yValues
  //       }]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: "World Wide Wine Production 2018"
  //       }
  //     }
  //   });
  // }

  // FAQ TOGGLE
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqRow = this.closest(".faq-row");
      const answer = faqRow.querySelector(".faq-answer");
      if (answer) {
        answer.classList.toggle("active");
        this.classList.toggle("active");
      }
    });
  });

  // DATE/TIME
  function showDateTime() {
    let showDate = document.getElementById("showDate");
    let hrs = document.getElementById("hrs");
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    let date = new Date();

    let dispDate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
    if (showDate) showDate.innerHTML = dispDate;

    let dispHrs = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let dispMin = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let dispSec = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

    if (hrs) hrs.innerHTML = dispHrs;
    if (min) min.innerHTML = dispMin;
    if (sec) sec.innerHTML = dispSec;
  }

  setInterval(showDateTime, 1000);