const notifLoading = (text, idx) => {
  // remove if already exist in dom to prevent bug
  if (document.querySelector("." + idx)) {
    return document.querySelector("." + idx).remove();
  }

  const header = document.querySelector(".notif");

  let notif = document.createElement("div");
  notif.classList.add("notification-alert");
  notif.classList.add(idx);

  // svg
  let svgAnim = `<svg width="30" height="30" viewBox="-21 -21 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#2a6da8" data-testid="oval-svg"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="4" data-testid="oval-secondary-group"><circle stroke-opacity=".5" cx="0" cy="0" r="20" stroke="#2a6da8" stroke-width="4"></circle><path d="M20 0c0-9.94-8.06-20-20-20"><animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g></svg>`;

  notif.innerHTML = `${svgAnim}${text}`;

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
