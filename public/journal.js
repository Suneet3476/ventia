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
