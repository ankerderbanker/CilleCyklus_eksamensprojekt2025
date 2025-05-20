document.addEventListener('DOMContentLoaded', function () {
  // Lottie animation
  lottie.loadAnimation({
    container: document.getElementById('cille-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'cillelutealvektoranimation.json'
  });

  // Flip cards on click
  const cards = document.querySelectorAll(".flip-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
});

// Intersection Observer for progress-circle
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.fill');
      fills.forEach(fill => fill.classList.add('start'));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

observer.observe(document.getElementById('progress-circle'));