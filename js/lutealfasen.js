
   // Funktion til at tjekke om element er i viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  const underlineEl = document.querySelector('.underline-word');

 function checkScroll() {
  if (isInViewport(underlineEl)) {
    // Vent 3 sekunder før vi tilføjer klassen
    setTimeout(() => {
      underlineEl.classList.add('in-view');
    }, 3000);

    window.removeEventListener('scroll', checkScroll); // kun én gang
  }
}

  window.addEventListener('scroll', checkScroll);
  window.addEventListener('DOMContentLoaded', checkScroll); // tjek ved load
  
  
  document.addEventListener('DOMContentLoaded', function () {
    // ── Lottie animation ─────────────────────────
    lottie.loadAnimation({
      container: document.getElementById('cille-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'cillelutealvektoranimation.json'
    });

    // ── Flip cards on click ─────────────────────
    const cards = document.querySelectorAll(".flip-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });

    // ── Klik på pil → vis diagram eller gå til menstruation.html ─
    const nextArrow = document.querySelector(".next-arrow");
    const typeSection = document.querySelector(".type-section");
    const diagram = document.querySelector(".diagram");
    const overskrift_2 = document.querySelector(".overskrift-2");

    if (nextArrow) {
      nextArrow.addEventListener("click", function () {
        // Hvis du vil vise diagram og skjule elementer
        if (typeSection && diagram && overskrift_2) {
          nextArrow.style.display = 'none';
          typeSection.style.display = 'none';
          diagram.style.display = 'flex';
          overskrift_2.style.display = 'block';
        } else {
          // Hvis elementerne ikke findes → gå videre til næste side
          window.location.href = "1menstruationsfasen.html";
        }
      });
    }
  });

  // ── Intersection Observer for progress-circle ────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.fill');
        fills.forEach(fill => fill.classList.add('start'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const progressCircle = document.getElementById('progress-circle');
  if (progressCircle) {
    observer.observe(progressCircle);
  }


