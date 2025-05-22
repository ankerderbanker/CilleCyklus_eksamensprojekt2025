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
});

(() => {
  "use strict";

  window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById("ambientAudio");

    // Prøv direkte autoplay
    audio.play().catch(() => {
      // Brugerinteraktion kræves – scroll som trigger
      const tryPlay = () => {
        audio.play().catch(() => {});
        window.removeEventListener("scroll", tryPlay);
      };
      window.addEventListener("scroll", tryPlay, { once: true });
    });

    /* ───────────────────────── 1. Generel navigation ───────────────────────── */
    window.goBack = () => (window.location.href = "index.html"); // Tilbage til forside

    /* ───────────────────────── 2. Dynamisk bølge-SVG ───────────────────────── */
    fetch("bolge.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("bølge-container").innerHTML = html;
      });

    /* ───────────────────────── 3. Element‑referencer ───────────────────────── */
    const scrollWrapper = document.getElementById("scroll-wrapper");
    const titleOverlay  = document.getElementById("section-title");

    /* ───────────────────────── 4. Scene 1: Spejl - Affirmationer ───────────────────── */
    const affirmationTexts = ["JEG ER DEJLIG", "JEG ER SMUK", "JEG ER SELVSIKKER!"];
    const affirmationEl    = document.getElementById("affirmationText");
    let currentAffirmation = 0;
    let scene1Visible      = false;

    function cycleAffirmation() {
      if (!scene1Visible) return;

      affirmationEl.style.opacity = 0;
      setTimeout(() => {
        currentAffirmation = (currentAffirmation + 1) % affirmationTexts.length;
        affirmationEl.textContent = affirmationTexts[currentAffirmation];
        affirmationEl.style.opacity = 1;
      }, 1000); // matcher CSS‑transition
    }
    setInterval(cycleAffirmation, 3000); // kør hvert 3. sekund

    /* ───────────────────────── 5. Scene 3: Skrivemaskine ────────────────────── */
    const scene3Lines = `Du har mere overskud,
føler dig åben og klar på fællesskab.
Det er en fase, hvor du har lyst til at være nærværende og dele kærlighed.

  både med andre og dig selv.`;
    let typedScene3 = false; // forhindrer genstart

    function startTypewriter() {
      const txt   = document.getElementById("typeText");
      const cur   = document.getElementById("typeCursor");
      let i = 0;

      (function type() {
        if (i < scene3Lines.length) {
          txt.textContent += scene3Lines.charAt(i++);
          setTimeout(type, 35); // hastighed af skrivemaskinen (ms/tegn)
        } else {
          cur.style.display = "none"; // skjul når færdig
        }
      })();
    }

    /* ───────────────────────── 6. Scene 4: Follikel vokser ─────────────────── */
    const follicle        = document.getElementById("follicle");
    const growPrompt      = document.getElementById("growPrompt");
    const ovulationPrompt = document.getElementById("ovulationPrompt");
    const ovulationArrow  = document.getElementById("ovulationArrow");
    let clicks            = 0; // 0–6 klik

    follicle.addEventListener("click", e => {
      e.stopPropagation();
      if (clicks >= 6) return; // 6 maks klik

      clicks++;
      const scale = 1 + clicks * 2.8; // slutter ved ca. 2,8×
      follicle.style.transform = `scale(${scale})`;

      if (clicks === 6) {
        growPrompt.style.display      = "none";
        ovulationPrompt.style.display = "grid"; // tekst der dukker op er centreret via CSS
      }
    });

    ovulationArrow.addEventListener("click", e => {
      e.stopPropagation();
      scrollWrapper.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    });

    /* ───────────────────────── 7. Parallax ──────────────────────────────────── */
    const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
    const sceneWidth  = window.innerWidth;

    function updateParallax() {
      const scrollX = scrollWrapper.scrollLeft;

      parallaxEls.forEach(el => {
        const depth       = parseFloat(el.dataset.depth) || 0.2; // fallback
        const sceneLeft   = el.closest(".scene").offsetLeft;
        const insideScene = scrollX - sceneLeft;
        const offset      = -insideScene * (1 - depth);
        el.style.transform = `translateX(${offset}px)`;
      });
    }

    let ticking = false;
    scrollWrapper.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
    updateParallax();
    window.addEventListener("resize", updateParallax);

    /* ───────────────────────── 8. Hormon‑overlay (Scene 2) ──────────────────── */
    const overlay   = document.getElementById("hormonOverlay");
    const fills     = [...overlay.querySelectorAll(".h-fill")];
    let overlayShown = false;

    function setFillWidths() {
      fills.forEach(el => {
        const pct = el.style.getPropertyValue("--pct") || 0;
        el.style.inset = `0 ${100 - pct}% 0 0`;
      });
    }
    function showOverlay() {
      overlay.classList.add("show");
      setFillWidths();
    }
    function hideOverlay() {
      overlay.classList.remove("show");
    }

    /* ───────────────────────── 9. Scroll‑håndtering ─────────────────────────── */
    scrollWrapper.addEventListener("scroll", () => {
      const index = Math.round(scrollWrapper.scrollLeft / window.innerWidth);

      // Scene 1 i fokus? (affirmationer)
      scene1Visible = index === 1;
      affirmationEl.style.opacity = scene1Visible ? 1 : 0;

      // Scene 3 start skrivemaskine én gang
      if (index === 3 && !typedScene3) {
        typedScene3 = true;
        startTypewriter();
      }

      // Scene 2 vis hormon‑overlay ved scene 2, ellers skjul
      if (index === 2) {
        if (!overlayShown) {
          overlayShown = true;
          setTimeout(showOverlay, 400); // 0,4 s delay
        }
      } else if (overlay.classList.contains("show")) {
        hideOverlay();
      }
    }, { passive: true });

    /* Klik‑toggle af overlay mens man er i Scene 2 */
    document.addEventListener("click", () => {
      const idx = Math.round(scrollWrapper.scrollLeft / window.innerWidth);
      if (idx !== 2) return; // ignorér klik event uden for Scene 2
      overlay.classList.contains("show") ? hideOverlay() : showOverlay();
    });

    /* ───────────────────────── 11. Lottie‑animation (ben) ──────────────────── */
    lottie.loadAnimation({
      container : document.getElementById("legsAnimation"),
      renderer  : "svg",
      loop      : true,
      autoplay  : true,
      path      : "folikelben.json", // sti til JSON animationen
    });
  });
})();
