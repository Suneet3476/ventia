document.querySelector('.clear-button').addEventListener('click', () => {
  const textArea = document.querySelector('textarea');
  textArea.value = '';
});

document.querySelector('.save-button').addEventListener('click', () => {
  const textArea = document.querySelector('textarea');
  const journalEntry = textArea.value;
  
  if (journalEntry.trim() !== '') {
    alert('Entry saved!'); // You can replace this with actual saving logic
  } else {
    alert('Please write something before saving.');
  }
});

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

document.getElementById('signout-button').addEventListener('click', function () {
  // Redirect to a blank page with a "Successfully signed out" message
  document.body.innerHTML = "<div style='color: #fff; text-align: center; font-size: 2rem; margin-top: 50px;'>Successfully signed out</div>";
  
  // After 3 seconds, redirect to login.html
  setTimeout(function () {
    window.location.href = 'login.html';
  }, 3000); // 3 second delay
});
