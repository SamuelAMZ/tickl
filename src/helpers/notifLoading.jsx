const notifLoading = (text) => {
  const header = document.querySelector(".notif");

  let notif = document.createElement("div");
  notif.classList.add("notification-alert");
  notif.innerText = text;

  header.appendChild(notif);

  let top = 3;
  Array.from(document.querySelectorAll(".notification-alert")).forEach(
    (not) => {
      not.style.top = top + 5.5 + "%";
      top = top + 5.5;
    }
  );
};

export default notifLoading;
