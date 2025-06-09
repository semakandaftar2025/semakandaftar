document.addEventListener("DOMContentLoaded", function () {
  // SIDEBAR TOGGLE
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggleBtn');
  const toggleIcon = document.getElementById('toggleIcon');

  // Load sidebar state on page load
  const savedSidebarState = localStorage.getItem("sidebarState");
  if (savedSidebarState === "closed") {
    sidebar.classList.add("close");
    toggleIcon.classList.replace("bx-chevrons-left", "bx-chevrons-right");
  }

  // Handle sidebar toggle and save state
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");

    // Save the state
    const isClosed = sidebar.classList.contains("close");
    localStorage.setItem("sidebarState", isClosed ? "closed" : "open");

    // Toggle icon direction
    toggleIcon.classList.toggle("bx-chevrons-left");
    toggleIcon.classList.toggle("bx-chevrons-right");
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
});
