let alleErAktive = false;

function toggleAlleNiveauer() {
  const niveauer = document.querySelectorAll('.gul-niveau');

  niveauer.forEach(niveau => {
    const ønsketBredde = niveau.getAttribute('data-niveau') || '60%';

    niveau.style.width = alleErAktive ? '0%' : ønsketBredde;
  });

  alleErAktive = !alleErAktive;
}

