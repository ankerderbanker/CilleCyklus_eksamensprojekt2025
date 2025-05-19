document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Grundopsætning ───────────────────────────── */
    const c = document.getElementById('livmorhals'),
          cfg = [['sma',30], ['mellem',60], ['stor',90]],  // [klasse, diameter]
          bubbles = [],
          gap = 85;                                       // min. afstand mellem centre
  


    /* ── 2. Hjælpefunktion: tjekker om en placering overlapper ─ */
    const fits = (x, y, r) => bubbles.every(
      ([bx, by, br]) => Math.hypot(bx - x, by - y) >= (br + r + gap)
    );
  


    /* ── 3. Generér 15 bobler uden overlap ─────────────────── */
    cfg.forEach(([cls, d]) => {
      for (let i = 0; i < 5; i++) {
        let x, y, tries = 0;
        do {                                 // find plads
          x = Math.random() * (c.clientWidth  - d);
          y = Math.random() * (c.clientHeight - d);
        } while (!fits(x + d/2, y + d/2, d/2) && ++tries < 200);
  
        const b = document.createElement('div');
        b.className = `boble ${cls}`;
        b.dataset.aos = 'zoom-in';           // ind-animation
        b.dataset.aosMirror = 'true';        // ud-animation
        b.style.left = x + 'px';
        b.style.top  = y + 'px';
  
        c.appendChild(b);
        bubbles.push([x + d/2, y + d/2, d/2]);
      }
    });
  


    /* ── 4. AOS: start animationerne ───────────────────────── */
    AOS.init({ duration: 900, mirror: true, once: false });
  
  });



  // Hent alle person-elementer (dem med billede, video og lyd)
const personer = document.querySelectorAll('.person');

// Gennemgå hver person én for én
personer.forEach((person) => {

  // Find de relevante elementer inde i denne person
  const img = person.querySelector('.clickImage');         // Billedet der kan klikkes
  const videoContainer = person.querySelector('.videoContainer'); // Container med video
  const video = person.querySelector('.myVideo');          // Selve videoelementet
  const audio = person.querySelector('.audio');            // Lydfilen der passer til videoen

  let playing = false; // Husk om videoen er i gang

  // Når man klikker på billedet → start video og lyd
  img.addEventListener('click', () => {
    img.style.display = 'none';             // Skjul billede
    videoContainer.style.display = 'block'; // Vis video
    video.currentTime = 0;                  // Start video fra begyndelsen
    audio.currentTime = 0;                  // Start lyd fra begyndelsen
    video.play();
    audio.play();
    playing = true;
  });

  // Når man klikker på videoen → stop og vis billede igen
  video.addEventListener('click', () => {
    video.pause();
    audio.pause();
    videoContainer.style.display = 'none';
    img.style.display = 'block';
    playing = false;
  });

  // Når videoen slutter af sig selv → vis billedet igen
  video.addEventListener('ended', () => {
    videoContainer.style.display = 'none';
    img.style.display = 'block';
    playing = false;
  });
});

  




  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = "Mens-smerter føles ikke ens for alle.\n\nFor nogen svarer det til en hovedpine. \nFor andre føles det som en nyresten.\n\nDe fleste ligger et sted mellem niveau 5 og 7.\n\n\nTryk dig gennem skalaen og få en fornemmelse af, \nhvor ondt det kan gøre.";

          el.textContent = ''; // sørgerr for den starter tom
          let i = 0;
          const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i === text.length) clearInterval(interval);
          }, 40);
          observer.unobserve(el);
        }
      });
    });

    observer.observe(document.getElementById("typewriter")); 
  });



document.addEventListener('DOMContentLoaded',()=>{
  const niveauer = document.querySelectorAll('.niveau');

  niveauer.forEach(niv=>{
    niv.querySelector('.cirkel').addEventListener('click', ()=>{
      // luk alle andre
      niveauer.forEach(n=> n===niv ? n.classList.toggle('open')
                                   : n.classList.remove('open'));
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {

    /* ── grab elements ─────────────────────────── */
    const overskrift_1   = document.querySelector('.overskrift_1');
    const overskrift_2   = document.querySelector('.overskrift_2');
    const iconsContainer = document.querySelector('.humor-icons');
    const icons          = document.querySelectorAll('.mood-icon');
  
    const typeSection    = document.querySelector('.typewriter-section-humor');
    const typer          = document.getElementById('typewriter-humor');
  
    const nextArrow      = document.querySelector('.next-arrow');
  
    const diagram        = document.querySelector('.diagram-container');
    const bars           = document.querySelectorAll('.mood-bar');
  
    /* ── tekst til skrivemaskinen ──────────────── */
    const text = `Lad os se,\nhvad andre kvinder føler\nunder deres menstruation\nrundt om i verden.`;
  
    /* ── helpers ───────────────────────────────── */
    const showTypewriter = (cb) => {
      typer.textContent = '';
      let i = 0;
      const iv = setInterval(() => {
        typer.textContent += text.charAt(i);
        if (++i === text.length){ clearInterval(iv); cb(); }
      }, 40);
    };
  
    const resetBars = () => bars.forEach(b => b.style.transform = 'scaleY(0)');
  
    /* ── klik på humør-ikon  →  start intro  ───── */
    icons.forEach(icon => icon.addEventListener('click', () => {
  
      iconsContainer.style.display = 'none';
      overskrift_1.style.display   = 'none';
  
      typeSection.style.display = 'flex';
      showTypewriter(() => {
        /* skrivemaskinen færdig → vis pil */
        nextArrow.style.display = 'block';
      });
    }));
  
    /* ── klik på pil  →  vis diagram  ──────────── */
    nextArrow.addEventListener('click', () => {
  
      nextArrow.style.display   = 'none';
      typeSection.style.display = 'none';
  
      diagram.style.display   = 'flex';
      overskrift_2.style.display = 'block';
  
      /* animér søjlerne */
      resetBars();
      setTimeout(() => bars.forEach(b => b.style.transform = 'scaleY(1)'), 50);
    });
  
  });
  