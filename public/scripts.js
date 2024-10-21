const carousel = document.querySelector('.carousel');
carousel.addEventListener('wheel', (e) => {
  e.preventDefault();
  carousel.scrollBy({
    left: e.deltaY < 0 ? -300 : 300,
    behavior: 'smooth',
  });
});

  document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Function to detect center testimonial
    function handleScroll() {
      testimonials.forEach(testimonial => {
        const rect = testimonial.getBoundingClientRect();
        const carouselCenter = (carousel.clientWidth / 2);

        // Check if testimonial is centered in the viewport
        const isActive = rect.left >= carouselCenter - 100 && rect.right <= carouselCenter + 100;
        
        if (isActive) {
          testimonial.classList.add('active');
        } else {
          testimonial.classList.remove('active');
        }
      });
    }

    // Scroll Event Listener for Carousel
    carousel.addEventListener('scroll', handleScroll);

    // Initial check in case page loads with some scrolling
    handleScroll();
  });


