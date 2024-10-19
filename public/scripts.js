// Add scroll animation for features section
document.addEventListener('scroll', function () {
  const features = document.querySelector('.features');
  const scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition > features.offsetTop + 100) {
    features.classList.add('animated');
  }
});
