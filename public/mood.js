// Select all emojis and add event listeners
// Select all emojis and add event listeners
const emojis = document.querySelectorAll('.emoji');
let selectedMood = null;

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    // Remove 'selected' class from all emojis
    emojis.forEach(e => e.classList.remove('selected'));

    // Add 'selected' class to the clicked emoji
    emoji.classList.add('selected');
    selectedMood = emoji.getAttribute('data-mood');
  });
});

// Handle mood submission
document.getElementById('submit-mood').addEventListener('click', () => {
  if (selectedMood) {
    alert(`You selected: ${selectedMood}`);
  } else {
    alert('Please select a mood!');
  }
});


// Mood History Chart (placeholder functionality)
const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [{
      label: 'Mood History',
      data: [3, 2, 4, 1, 5],  // Placeholder data
      backgroundColor: 'rgba(255, 0, 226, 0.2)',
      borderColor: '#ff00e2',
      borderWidth: 2,
      fill: true
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
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
