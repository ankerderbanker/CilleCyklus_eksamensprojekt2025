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
  