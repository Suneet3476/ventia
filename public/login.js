document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.form-box.login form');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Check if the entered email and password match the specified values
    if (emailInput === 'suneet38459@gmail.com' && passwordInput === '49185') {
      // Redirect to dashboard.html
      window.location.href = 'dashboard.html';
    } else {
      // If credentials don't match, show an error message or handle it accordingly
      alert('Invalid email or password. Please try again.');
    }
  });
});
