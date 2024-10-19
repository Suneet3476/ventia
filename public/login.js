document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.token); // Save token to local storage
    window.location.href = '/dashboard.html'; // Redirect to dashboard
  } else {
    alert(data.msg); // Show error message
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  const response = await fetch('/api/dashboard', {
    headers: { Authorization: token }
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById('welcomeMessage').textContent = `Welcome, ${data.msg}`;
    // You can also display other features (like Vent, Listen)
  } else {
    window.location.href = '/login.html'; // Redirect if not logged in
  }
});

