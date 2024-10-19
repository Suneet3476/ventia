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
