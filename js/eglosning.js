function togglePopup(id) {
    const popup = document.getElementById(id);
    const erSynlig = popup.style.display === 'block';
  
    // Luk alle først
    document.querySelectorAll('.popup-ved-prik').forEach(p => {
      p.style.display = 'none';
    });
  
    // Hvis den popup vi klikker på ikke var synlig, vis den
    if (!erSynlig) {
      popup.style.display = 'block';
    }
  }
  
   // ikonerne med paralax
   document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
  
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = parseFloat(el.dataset.speed);
      el.style.transform = `translate(-50%, calc(-50% + ${scrollY * speed * 0.05}px))`;
    });
  });
  



// nulstill alle hormon-barers bredde
function resetHormonBarer(){
  document.querySelectorAll('#popup8 .gul-niveau')
          .forEach(n => n.style.width = '0%');
}

// 1-sekunds animation hver gang popup 8 åbner
function animateHormonBarer(){
  const niveauer = document.querySelectorAll('#popup8 .gul-niveau');
  setTimeout(() => {
    niveauer.forEach(n => {
      n.style.width = n.getAttribute('data-niveau') || '60%';
    });
  }, 1000);
}

/* opdateret togglePopup – kun linjer markeret med *** er ændret */
function togglePopup(id){
  const popup = document.getElementById(id);
  const varSynlig = popup.style.display === 'block';

  document.querySelectorAll('.popup-ved-prik').forEach(p=>{
    p.style.display = 'none';
  });

  /* *** hvis vi lukker popup 8 skal barer nulstilles */
  if(id !== 'popup8'){ resetHormonBarer(); }

  if(!varSynlig){
    popup.style.display = 'block';

    if(id === 'popup8'){
      resetHormonBarer();   // start altid fra 0
      animateHormonBarer(); // og kør animationen
    }
  }
}

/* ---------- Typewriter til introduktionstekst ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const typer = document.getElementById('typewriter-eggl');

  const text = `Her kan du udforske kvindekroppen gennem ægløsningsfasen.
Klik på punkterne for at opdage,
hvordan hormoner påvirker energi, følelser og fysiske forandringer.`;

  /* 1. mål slut-højden */
  typer.style.visibility = 'hidden';
  typer.style.whiteSpace  = 'pre-line';
  typer.textContent       = text;
  const finalH = typer.offsetHeight + 'px';

  /* 2. nulstil og lås højden */
  typer.textContent       = '';
  typer.style.visibility  = 'visible';
  typer.style.minHeight   = finalH;

  /* 3. typewriter */
  let i = 0;
  const iv = setInterval(() => {
    typer.textContent += text.charAt(i);
    if (++i === text.length) clearInterval(iv);
  }, 40);
});

