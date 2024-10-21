document.addEventListener('scroll', () => {
  const reveals = document.querySelectorAll('.section-card');
  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('visible');
    } else {
      reveal.classList.remove('visible');
    }
  });
});
