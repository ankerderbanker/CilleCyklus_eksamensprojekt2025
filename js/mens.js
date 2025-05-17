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
  