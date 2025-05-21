
/* overgangs video til fasen */
document.addEventListener('DOMContentLoaded', () => {
  // JS der skjuler overlayet når videoen er færdig 
  const overlay = document.getElementById('phaseVideoOverlay');
  const video = document.getElementById('phaseVideo');
  video.onended = function() {
    overlay.style.display = 'none';
  };
});

/* hormon-animation & popup */
/* Nulstil alle gule bjælker (bruges når man lukker/hopper væk) */
function resetHormonBarer() {
  document.querySelectorAll('#popup8 .gul-niveau')
          .forEach(n => n.style.width = '0%');
}

/* Kør animationen: først vent 1 sekund, så fylder bjælkerne til deres data-niveau */
function animateHormonBarer() {
  const bars = document.querySelectorAll('#popup8 .gul-niveau');
  setTimeout(() => {
    bars.forEach(b => b.style.width = b.dataset.niveau || '60%');
  }, 1000);  // 1000 ms = 1 sekund
}

/* Åbn/luk pop-ups & hormon-cirklen (popup8) */
function togglePopup(id) {
  const popup = document.getElementById(id);
  const varSynlig = popup.style.display === 'block';

  // luk alle
  document.querySelectorAll('.popup-ved-prik').forEach(p => p.style.display = 'none');
  // hvis vi forlader popup8 → nulstil barerne
  if (id !== 'popup8') resetHormonBarer();

  // hvis den valgte ikke var synlig, så åbn den
  if (!varSynlig) {
    popup.style.display = 'block';
  
  // og hvis det er hormon-popup’en: så starter den forfra (animerer)
    if (id === 'popup8') {
      resetHormonBarer();
      animateHormonBarer();
    }
  }
}

/* PARALLAX-IKONER */
/* Får små SVG-ikoner til at drive op/ned afhængigt af scroll.
   data-speed på hvert <img> bestemmer hvor meget de bevæger sig. */
document.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = parseFloat(el.dataset.speed);
// først flytter vi ikonet, så midten havner præcis i punktet (-50%, -50%),
// og bagefter lægger vi lidt ekstra op/ned-bevægelse på for parallax-effekten
    el.style.transform = `translate(-50%, calc(-50% + ${y * speed * 0.05}px))`;
  });
});

/* TYPEWRITER-INTRO */
/* Skriver teksten tegn-for-tegn som en typewriter.
   Fallback-teksten står allerede i HTML, så siden er aldrig er helt tom */
document.addEventListener('DOMContentLoaded', () => {
  const typer = document.getElementById('typewriter-eggl');
  const text = `Her kan du udforske kvindekroppen gennem ægløsningsfasen.
Klik på punkterne for at opdage,
hvordan hormoner påvirker energi, følelser og fysiske forandringer.`;

  /* Låser højden, ellers hopper alt nedenunder mens typewriteren skriver */
  typer.style.visibility = 'hidden';
  typer.style.whiteSpace  = 'pre-line';
  typer.textContent       = text;
  const finalH = typer.offsetHeight + 'px';

  typer.textContent = '';
  typer.style.minHeight = finalH;
  typer.style.visibility = 'visible';

  /* skrivemaskine-effekt */
  let i = 0;
  const iv = setInterval(() => {
    typer.textContent += text.charAt(i);
    if (++i === text.length) clearInterval(iv);
  }, 40);   // 40 ms pr. tegn ≈ 25 tegn/sek.
});

/* Næste-side pil */
/* Klik på knappen så kommer man til næste side */
const nextArrow = document.querySelector('.naestefase-pil');
if (nextArrow) {
  nextArrow.addEventListener('click', () => {
    window.location.href = "4lutealfasen.html"; // linker videre til næste fase
  });
}
