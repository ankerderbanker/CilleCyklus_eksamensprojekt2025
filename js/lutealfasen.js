// OVERGANGS VIDEOER

// JS der skjuler overlayet når videoen er færdig 
document.addEventListener('DOMContentLoaded', () => {
  // JS der skjuler overlayet når videoen er færdig 
  const overlay = document.getElementById('phaseVideoOverlay');
  const video = document.getElementById('phaseVideo');
  video.onended = function() {
    overlay.style.display = 'none';
  };
});

   
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
    // Vent 3 sekunder før vi tilføjer klassen
    setTimeout(() => {
      underlineEl.classList.add('in-view');
    }, 3000);

    window.removeEventListener('scroll', checkScroll); // kun én gang
  }
}

  window.addEventListener('scroll', checkScroll);
  window.addEventListener('DOMContentLoaded', checkScroll); // tjek ved load
  


/* ----------   TYPEWRITER – LUTEALFASE   ---------- */
 // Formål: Vis øjenfaldende og informerende sektion med "skrivende" tekst, der først vises når sektionen er synlig på skærmen.
document.addEventListener('DOMContentLoaded', () => {
  const typer = document.getElementById('typewriter-lutealfase');
  const text = `Alle disse tanker og følelser skyldes de hormoner, som Cilles krop er påvirket af i denne fase. Hendes livmoder forbereder sig nemlig på, at ægget fra ægløsningen enten kan blive befrugtet og gøre hende gravid – eller at cyklussen starter forfra, og hun får menstruation.`;

  // Forbered tekstfeltet
  typer.style.visibility = 'hidden';
  typer.style.whiteSpace = 'pre-line';
  typer.textContent = text;

  const finalH = typer.offsetHeight + 'px';
  typer.textContent = '';
  typer.style.minHeight = finalH;
  typer.style.visibility = 'visible';

  // Typewriter-funktion
  function startTypewriter() {
    let i = 0;
    const iv = setInterval(() => {
      typer.textContent += text.charAt(i);
      if (++i === text.length) clearInterval(iv);
    }, 50);
  }

  // Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startTypewriter();
        observer.unobserve(entry.target); // Kun én gang
      }
    });
  }, {
    threshold: 0.5 // Start når 50% af elementet er synligt
  });

  observer.observe(typer);
});

// LOTTIE-animation: Indlæser og afspiller en SVG-animation i loop når siden er klar
  document.addEventListener('DOMContentLoaded', function () {
    // ── Lottie animation ─────────────────────────
    lottie.loadAnimation({
      container: document.getElementById('cille-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'cillelutealvektoranimation.json'
    });
  });

    // Flip card-effekt: Når man klikker på kortet, vendes det (for-/bagside skifter)
    const cards = document.querySelectorAll(".flip-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });

 // Progress-circle: Når cirklen er synlig, start animation ved at tilføje klassen 'start'
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

   // Klik på pil: Navigér til næste side i cyklus ("1menstruationsfasen.html")
    document.addEventListener('DOMContentLoaded', () => {
      const nextArrow = document.querySelector('.next-arrow-faelles');
      if (nextArrow) {
        nextArrow.addEventListener('click', function() {
          window.location.href = "1menstruationsfasen.html"; 
        });
      }
    });
    


