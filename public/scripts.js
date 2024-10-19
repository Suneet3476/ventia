// Simple auto-scrolling carousel
let testimonials = document.querySelector('.carousel');
let index = 0;

function rotateTestimonials() {
  index = (index + 1) % 3;  // Cycle through testimonials
  testimonials.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(rotateTestimonials, 3000);
