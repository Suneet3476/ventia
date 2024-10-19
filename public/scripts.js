const carousel = document.querySelector('.carousel');
carousel.addEventListener('wheel', (e) => {
  e.preventDefault();
  carousel.scrollBy({
    left: e.deltaY < 0 ? -300 : 300,
    behavior: 'smooth',
  });
});
