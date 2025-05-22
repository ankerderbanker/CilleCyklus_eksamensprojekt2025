document.addEventListener('DOMContentLoaded', () => {
  // JS der skjuler overlayet når videoen er færdig 
  const overlay = document.getElementById('phaseVideoOverlay');
  const video   = document.getElementById('phaseVideo');

  video.onended = function() {
    overlay.style.opacity = '0';      // fade ud
    overlay.style.pointerEvents = 'none';
    setTimeout(() => { 
      overlay.style.display = 'none'; // skjul efter fade
    }, 700); 
  };

  // Funktion til at tjekke om element er i viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Tilføjer klassen 'in-view' til elementet efter 3 sek., når det bliver synligt første gang
  const underlineEl = document.querySelector('.underline-word');
  function checkScroll() {
    if (isInViewport(underlineEl)) {
      setTimeout(() => {
        underlineEl.classList.add('in-view');
      }, 3000);
      window.removeEventListener('scroll', checkScroll);
    }
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll();

  // TYPEWRITER – LUTEALFASE
  const typer = document.getElementById('typewriter-lutealfase');
  const text = `Alle disse tanker og følelser skyldes de hormoner, som Cilles krop er påvirket af i denne fase. Hendes livmoder forbereder sig nemlig på, at ægget fra ægløsningen enten kan blive befrugtet og gøre hende gravid – eller at cyklussen starter forfra, og hun får menstruation.`;

  typer.style.visibility = 'hidden';
  typer.style.whiteSpace = 'pre-line';
  typer.textContent = text;
  const finalH = typer.offsetHeight + 'px';
  typer.textContent = '';
  typer.style.minHeight = finalH;
  typer.style.visibility = 'visible';

  function startTypewriter() {
    let i = 0;
    const iv = setInterval(() => {
      typer.textContent += text.charAt(i);
      if (++i === text.length) clearInterval(iv);
    }, 50);
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startTypewriter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(typer);

  // LOTTIE-animation
  lottie.loadAnimation({
    container: document.getElementById('cille-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'cillelutealvektoranimation.json'
  });

  // Flip card-effekt
  document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  // Progress-circle
  const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fill').forEach(fill => fill.classList.add('start'));
        observer2.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const progressCircle = document.getElementById('progress-circle');
  if (progressCircle) observer2.observe(progressCircle);

  // Klik på pil: Navigér til næste side i cyklus ("1menstruationsfasen.html")
  const nextArrow = document.querySelector('.next-arrow-faelles');
  if (nextArrow) {
    nextArrow.addEventListener('click', function() {
      window.location.href = "1menstruationsfasen.html";
    });
  }
});
