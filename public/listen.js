// listen.js
document.addEventListener("DOMContentLoaded", () => {
  const notifyButton = document.querySelector(".notify-button");

  notifyButton.addEventListener("click", () => {
    alert("You'll be notified when this service is live!");
  });
});
