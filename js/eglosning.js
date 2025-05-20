/* ----------   javaskript for egløsningsiden   ---------- */


/* ----------   POP-UPS + hormon-animation   ---------- */
function resetHormonBarer() {
  document.querySelectorAll('#popup8 .gul-niveau')
          .forEach(n => n.style.width = '0%');
}

function animateHormonBarer() {
  const bars = document.querySelectorAll('#popup8 .gul-niveau');
  setTimeout(() => {
    bars.forEach(b => b.style.width = b.dataset.niveau || '60%');
  }, 1000);
}

function togglePopup(id) {
  const popup = document.getElementById(id);
  const varSynlig = popup.style.display === 'block';

  // luk alle
  document.querySelectorAll('.popup-ved-prik').forEach(p => p.style.display = 'none');
  if (id !== 'popup8') resetHormonBarer();

  // åbn valgt popup
  if (!varSynlig) {
    popup.style.display = 'block';
    if (id === 'popup8') {
      resetHormonBarer();
      animateHormonBarer();
    }
  }
}

/* ----------   PARALLAX-IKONER   ---------- */
document.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    el.style.transform = `translate(-50%, calc(-50% + ${y * speed * 0.05}px))`;
  });
});

/* ----------   TYPEWRITER-INTRO   ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const typer = document.getElementById('typewriter-eggl');
  const text = `Her kan du udforske kvindekroppen gennem ægløsningsfasen.
Klik på punkterne for at opdage,
hvordan hormoner påvirker energi, følelser og fysiske forandringer.`;

  /* lås feltets højde, så layout ikke hopper */
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
