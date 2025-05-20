let alleErAktive = false;

function toggleAlleNiveauer() {
  const niveauer = document.querySelectorAll('.gul-niveau');

  niveauer.forEach(niveau => {
    const ønsketBredde = niveau.getAttribute('data-niveau') || '60%';

    niveau.style.width = alleErAktive ? '0%' : ønsketBredde;
  });

  alleErAktive = !alleErAktive;
}

.bue-overskrift {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 300px;
    margin: 0 auto 30px;
    transform: translateY(10px);
    font-family: 'Super Funky', sans-serif;
  }
  
  .bue-overskrift span {
    display: inline-block;
    font-size: 22px;
    color: #f7f797;
    transform: rotate(calc(var(--i) * 7deg - 40deg));
    transform-origin: bottom center;
  }
  