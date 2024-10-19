// Sidebar toggle functionality
const sidebar = document.querySelector('.sidebar');
const toggleSidebarButton = document.querySelector('.toggle-sidebar');

toggleSidebarButton.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  document.querySelector('.main-content').classList.toggle('expanded');
});

// Button functionality (same as before)
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
