window.addEventListener("DOMContentLoaded", () => {
  const niveauer = document.querySelectorAll('.gul-niveau');

  setTimeout(() => {
    niveauer.forEach(niveau => {
      const ønsketBredde = niveau.getAttribute('data-niveau') || '60%';
      niveau.style.width = ønsketBredde;
    });
  }, 1000); // 1000 millisekunder = 1 sekund
});
