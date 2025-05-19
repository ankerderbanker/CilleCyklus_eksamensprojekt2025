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
    /* ---------- typewriter ---------- */
    const twEl       = document.getElementById('typewriter-humor');
    const twSection  = document.querySelector('.typewriter-section-humor');
    const iconsWrap  = document.querySelector('.humor-icons');
    const icons      = document.querySelectorAll('.mood-icon');
    const diagram    = document.querySelector('.diagram-container');
    const overskrift1= document.querySelector('.overskrift_1');
    const overskrift2= document.querySelector('.overskrift_2');
  
    const text = `Dit humør påvirker ikke bare dig –
  det påvirker hele din cyklus. 💭
  
  Lad os kigge lidt nærmere...`;
  
    function typewriter(str, cb){
      twEl.textContent = '';
      let i = 0;
      const id = setInterval(()=>{
        twEl.textContent += str.charAt(i++);
        if(i === str.length){clearInterval(id); cb();}
      },40);
    }
  
    icons.forEach(icon=>{
      icon.addEventListener('click', ()=>{
        iconsWrap.style.display   = 'none';
        overskrift1.style.display = 'none';
        twSection.style.display   = 'flex';
  
        typewriter(text, ()=>{
          twSection.style.display  = 'none';
          diagram.style.display    = 'flex';
          overskrift2.style.display= 'block';
          diagram.classList.add('animate'); // trigg CSS-søjler
        });
      });
    });
  });