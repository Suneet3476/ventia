// Sidebar toggle functionality
const sidebar = document.querySelector('.sidebar');
const toggleSidebarButton = document.querySelector('.toggle-sidebar');

toggleSidebarButton.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
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
