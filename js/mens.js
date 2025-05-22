
// OVERGANGS VIDEOER
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


  /* ---------- BOBLE-ANIMATION (LIVMORHALS) ---------- */
  // Formål: Skabe "organisk" baggrund med ikke-overlappende bobler omkring livmoderen.

  const livmorhals = document.getElementById('livmorhals');
  if (livmorhals) {
    // Definér de tre boble-typer: class-navn og diameter i px
    const bobleTyper = [['sma', 30], ['mellem', 60], ['stor', 90]];
    const bubbles = []; // Gemmer center-koordinater og radius for alle bobler
    const minAfstand = 85; // Minimum afstand mellem boble-centre (for at undgå overlap)

    // Funktion: Tjek om en boble kan placeres uden at overlappe de andre
    const passer = (x, y, r) => 
      bubbles.every(
        ([bx, by, br]) => Math.hypot(bx - x, by - y) >= (br + r + minAfstand)
      );

    // For hver boble-type oprettes 5 bobler i tilfældig placering, men uden overlap
    bobleTyper.forEach(([cls, d]) => {
      for (let i = 0; i < 5; i++) {
        let x, y, tries = 0;
        do {
          // Find tilfældig position – men indenfor containerens område
          x = Math.random() * (livmorhals.clientWidth - d);
          y = Math.random() * (livmorhals.clientHeight - d);
          // Prøv maks 200 gange for at finde en plads
        } while (!passer(x + d/2, y + d/2, d/2) && ++tries < 200);

        // Lav boblen som div og tilføj AOS-data for animation
        const b = document.createElement('div');
        b.className = `boble ${cls}`;
        b.dataset.aos = 'zoom-in';
        b.dataset.aosMirror = 'true';
        b.style.left = x + 'px';
        b.style.top = y + 'px';

        livmorhals.appendChild(b); // Tilføj til DOM
        bubbles.push([x + d/2, y + d/2, d/2]); // Gem center og radius
      }
    });

    // Start AOS-animationer (fade-in/zoom på bobler)
    if (window.AOS) AOS.init({ duration: 900, mirror: true, once: false });
  }


  /* ---------- PERSONER (VIDEO + LYD SYNK) ---------- */
  // Formål: Når du klikker på en figur, starter synkroniseret video og lyd – og viser billedet igen når video/lyd er slut.

  const personer = document.querySelectorAll('.person');
  personer.forEach((person) => {
    const img = person.querySelector('.clickImage');
    const videoContainer = person.querySelector('.videoContainer');
    const video = person.querySelector('.myVideo');
    const audio = person.querySelector('.audio');

    // Klik på billede: skjul billede, vis video, start både video og lyd forfra
    img.addEventListener('click', () => {
      img.style.display = 'none';
      videoContainer.style.display = 'block';
      video.currentTime = 0;
      audio.currentTime = 0;
      video.play();
      audio.play();
    });

    // Klik på video: stop begge, skjul video, vis billede igen
    video.addEventListener('click', () => {
      video.pause();
      audio.pause();
      videoContainer.style.display = 'none';
      img.style.display = 'block';
    });

    // Hvis video slutter før lyd, så loop video indtil lyden også er færdig
    video.addEventListener('ended', () => {
      if (!audio.ended) {
        video.currentTime = 0;
        video.play();
      } else {
        // (Skal sjældent bruges, men "sikring" hvis begge slutter samtidig)
        videoContainer.style.display = 'none';
        img.style.display = 'block';
      }
    });

    // Når lyden er slut: stop video og gå tilbage til billede
    audio.addEventListener('ended', () => {
      video.pause();
      videoContainer.style.display = 'none';
      img.style.display = 'block';
    });
  });


  /* ---------- SMERTESKALA: SKRIVEMASKINE-EFFEKT ---------- */
  // Formål: Vis dramatisk introduktion til smerteskalaen med "skrivende" tekst, der først vises når sektionen er synlig på skærmen.

  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    // Brug IntersectionObserver så effekten kun sker når elementet faktisk bliver synlig for brugeren (god performance)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Teksten skrives én tegn ad gangen med setInterval
          const text = "Mens-smerter føles ikke ens for alle.\n\nFor nogen svarer det til en hovedpine. \nFor andre føles det som en nyresten.\n\nDe fleste ligger et sted mellem niveau 5 og 7.\n\nTryk dig gennem skalaen og få en fornemmelse af, \nhvor ondt det kan gøre.";
          typewriterEl.textContent = '';
          let i = 0;
          const interval = setInterval(() => {
            typewriterEl.textContent += text.charAt(i);
            i++;
            if (i === text.length) clearInterval(interval); // Stop når færdig
          }, 40);
          observer.unobserve(typewriterEl); // Kør kun effekten én gang
        }
      });
    });
    observer.observe(typewriterEl);
  }


  /* ---------- SMERTESKALA: NIVEAU-ÅBN/LUK ---------- */
  // Formål: Gør så kun ét "niveau" (1-7) kan være åbent ad gangen. Klik på en cirkel åbner/lukker info og ikon.

  const niveauer = document.querySelectorAll('.niveau');
  niveauer.forEach(niv => {
    niv.querySelector('.cirkel').addEventListener('click', () => {
      // Luk alle andre end den du klikker på
      niveauer.forEach(n => n === niv ? n.classList.toggle('open')
                                      : n.classList.remove('open'));
    });
  });


  /* ---------- HORMON-BARER: ANIMATION ---------- */
  // Formål: Viser hormon-niveauer (gul bjælke) vokse op til deres ønskede bredde lidt efter load for "progress"-effekt.

  const hormonBarer = document.querySelectorAll('.gul-niveau');
  setTimeout(() => {
    hormonBarer.forEach(niveau => {
      const ønsketBredde = niveau.getAttribute('data-niveau') || '60%';
      niveau.style.width = ønsketBredde; // CSS transition laver animationen
    });
  }, 1000); // Starter 1 sekund efter load for at sikre DOM er klar


  /* ---------- HUMØRCIRKEL: INTERAKTIV QUIZ ---------- */
  // Formål: Brugeren vælger et humør, ser skrivemaskine-tekst, og får til sidst et animeret diagram

  const overskrift_1   = document.querySelector('.overskrift_1');
  const overskrift_2   = document.querySelector('.overskrift_2');
  const iconsContainer = document.querySelector('.humor-icons');
  const icons          = document.querySelectorAll('.mood-icon');
  const typeSection    = document.querySelector('.typewriter-section-humor');
  const typer          = document.getElementById('typewriter-humor');
  const nextArrow      = document.querySelector('.next-arrow');
  const diagram        = document.querySelector('.diagram-container');
  const bars           = document.querySelectorAll('.mood-bar');

  // Teksten til skrivemaskinen efter humørvalg
  const quizText = `Lad os se,\nhvad andre kvinder føler\nunder deres menstruation\nrundt om i verden.`;

  // Helper: skriv tekst ét tegn ad gangen og kald cb() til sidst
  const showTypewriter = (cb) => {
    typer.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      typer.textContent += quizText.charAt(i);
      if (++i === quizText.length) {
        clearInterval(iv);
        if (cb) cb();
      }
    }, 40);
  };

  // Helper: Skjul alle diagram-søjler (skaler til 0)
  const resetBars = () => bars.forEach(b => b.style.transform = 'scaleY(0)');

  // 1. Klik på humør-ikon: skjul ikoner, vis skrivemaskine
  icons.forEach(icon => icon.addEventListener('click', () => {
    iconsContainer.style.display = 'none';
    if (overskrift_1) overskrift_1.style.display = 'none';
    typeSection.style.display = 'flex';
    showTypewriter(() => {
      nextArrow.style.display = 'block'; // Vis pil når teksten er færdig
    });
  }));

  // 2. Klik på pil: vis diagram og animér søjler
  if(nextArrow) {
    nextArrow.addEventListener('click', () => {
      nextArrow.style.display   = 'none';
      typeSection.style.display = 'none';
      diagram.style.display   = 'flex';
      if (overskrift_2) overskrift_2.style.display = 'block';
      resetBars(); // Start med skjulte søjler
      setTimeout(() => bars.forEach(b => b.style.transform = 'scaleY(1)'), 50); // Animer op
    });
  }


  /* ---------- NÆSTE SIDE-PIL (FASTE) ---------- */
  // Formål: Klik på pil i bunden sender brugeren videre til næste side
  const nextArrowF = document.querySelector('.next-arrow-faelles');
  if (nextArrowF) {
    nextArrowF.addEventListener('click', function() {
      window.location.href = "2follikelfasen.html"; 
    });
  }


  /* ---------- PARALLAX EFFEKT ---------- */
  // Formål: Giver baggrundsikoner dynamisk scroll-effekt. Hurtige/ langsomme ikoner afhænger af data-speed attribut

  document.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = parseFloat(el.dataset.speed);
      // Flyt element op/ned afhængig af scroll-position og fart
      el.style.transform = `translate(-50%, calc(-50% + ${y * speed * 0.05}px))`;
    });
  });

});
