const ctx = document.getElementById('mentalHealthChart').getContext('2d');
const mentalHealthChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022'],
        datasets: [{
            label: 'Percentage of People Suffering from Depression',
            data: [5, 10, 15, 20, 25, 30, 35],
            borderColor: '#8c4fff',
            backgroundColor: 'rgba(140, 79, 255, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#8c4fff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#333'
                }
            },
            y: {
                ticks: {
                    color: '#333',
                    beginAtZero: true
                }
            }
        }
    }
});






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

