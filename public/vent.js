document.addEventListener("DOMContentLoaded", () => {
  const notifyButton = document.querySelector(".notify-button");

  notifyButton.addEventListener("click", () => {
    showPopup("You’ll be notified when this service is live!");
  });

  function showPopup(message) {
    // Create the popup container
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.textContent = message;

    // Add the popup to the body
    document.body.appendChild(popup);

    // Remove the popup after 3 seconds
    setTimeout(() => {
      popup.remove();
    }, 3000);
  }
});
