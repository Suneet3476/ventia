document.getElementById('signout-button').addEventListener('click', function () {
  // Redirect to a blank page with a "Successfully signed out" message
  document.body.innerHTML = "<div style='color: #fff; text-align: center; font-size: 2rem; margin-top: 50px;'>Successfully signed out</div>";
  
  // After 3 seconds, redirect to login.html
  setTimeout(function () {
    window.location.href = 'login.html';
  }, 3000); // 3 second delay
});
