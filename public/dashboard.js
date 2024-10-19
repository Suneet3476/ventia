// Sidebar toggle functionality
const sidebar = document.querySelector('.sidebar');
const toggleSidebarButton = document.querySelector('.toggle-sidebar');
const sidebarRestoreButton = document.querySelector('.sidebar-restore');

toggleSidebarButton.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  document.querySelector('.main-content').classList.toggle('expanded');
});

sidebarRestoreButton.addEventListener('click', () => {
  sidebar.classList.remove('collapsed');
});

// Button functionality
document.getElementById('vent-button').addEventListener('click', () => {
  alert('Venting session started!');
});

document.getElementById('listen-button').addEventListener('click', () => {
  alert('Listening session started!');
});

document.getElementById('mood-checkin').addEventListener('click', () => {
  alert('Time to check in on your mood!');
});

document.getElementById('start-journal').addEventListener('click', () => {
  alert('Let\'s start journaling!');
});

// Pie Chart (Chart.js)
const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Improved', 'Not Improved'],
    datasets: [{
      data: [80, 20],
      backgroundColor: ['#00a2ff', '#ff00e2'],
      hoverBackgroundColor: ['#007acc', '#d400a1'],
    }]
  },
  options: {
    responsive: true,
    legend: {
      position: 'top',
    },
  }
});

document.getElementById('signout-button').addEventListener('click', function () {
  // Redirect to a blank page with a "Successfully signed out" message
  document.body.innerHTML = "<div style='color: #fff; text-align: center; font-size: 2rem; margin-top: 50px;'>Successfully signed out</div>";
  
  // After 3 seconds, redirect to login.html
  setTimeout(function () {
    window.location.href = 'login.html';
  }, 3000); // 3 second delay
});

