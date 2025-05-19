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
  