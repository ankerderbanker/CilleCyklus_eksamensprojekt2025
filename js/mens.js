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
  const icons = document.querySelectorAll('.mood-icon');
  const iconsContainer = document.querySelector('.humor-icons');
  const typewriter = document.getElementById('typewriter-humor');
  const typewriterSection = document.querySelector('.typewriter-section-humor');

  const diagram = document.querySelector('.diagram-container');

  const text = "Dit humør påvirker ikke bare dig –\ndet påvirker hele din cyklus. 💭\n\nLad os kigge lidt nærmere...";

  function showTypewriter(callback) {
    typewriter.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      typewriter.textContent += text.charAt(i);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        callback(); // når teksten er færdig
      }
    }, 40);
  }

  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      iconsContainer.style.display = 'none';
      typewriterSection.style.display = 'flex';

   showTypewriter(() => {
  typewriterSection.style.display = 'none'; // skjul teksten
  diagram.style.display = 'flex';
        setTimeout(() => {
          // animér søjlerne
          const bars = document.querySelectorAll('.mood-bar');
          bars.forEach(bar => {
            bar.style.transform = 'scaleY(1)';
          });
        }, 100);
      });
    });
  });
});
