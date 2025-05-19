document.addEventListener('DOMContentLoaded', function () {
    lottie.loadAnimation({
      container: document.getElementById('cille-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'cillelutealvektoranimation.json'
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tilføj klassen 'start' til hver .fill
        const fills = entry.target.querySelectorAll('.fill');
        fills.forEach(fill => fill.classList.add('start'));

        // Stop observeren hvis det kun skal ske én gang
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // 50% synlig før den aktiveres

  observer.observe(document.getElementById('progress-circle'));