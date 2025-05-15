const dragger = document.getElementById("dragger");
  const container = document.getElementById("circleContainer");
  const phases = document.querySelectorAll(".phase");

  const radius = 220; // Radius for dragger rundt om midten
  let centerX, centerY;
  let isDragging = false;

  function updateCenter() {
    const rect = container.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
  }

  // Sæt position på dragger langs cirkelbane via vinkel (radian)
  function setDraggerPosition(angle) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    dragger.style.left = `${x}px`;
    dragger.style.top = `${y}px`;
  }

  // Opdater hvilke faser der er aktive ud fra vinkel
  function updatePhaseHover(angle) {
    // Konverter radian til grader med 0° i toppen (ved -90° vinkel)
    let degrees = (angle * 180) / Math.PI;
    degrees = (degrees + 90 + 360) % 360; 

    let activePhase = null;
    phases.forEach((phase) => {
      const phaseNum = parseInt(phase.dataset.phase);
      const start = (phaseNum - 1) * 90;
      const end = phaseNum * 90;

      if (degrees >= start && degrees < end) {
        phase.classList.add("active");
        activePhase = phaseNum;
      } else {
        phase.classList.remove("active");
      }
    });

    // Hvis cirklen er over en fase, aktivér dragger
    if (activePhase !== null) {
      dragger.classList.add("active");
    } else {
      dragger.classList.remove("active");
    }
  }

  // Startvinkel: i toppen = -90 grader = -π/2 radian
  let angle = -Math.PI / 2;

  // Setup center og startposition
  function init() {
    updateCenter();
    setDraggerPosition(angle);
    updatePhaseHover(angle);
  }

  // Mouse event handlers
  function onMouseDown(e) {
    isDragging = true;
    e.preventDefault();
  }
  function onMouseMove(e) {
    if (!isDragging) return;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    angle = Math.atan2(dy, dx);
    setDraggerPosition(angle);
    updatePhaseHover(angle);
  }
  function onMouseUp(e) {
    isDragging = false;
  }

  dragger.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);

  // Opdater center hvis vinduet ændres størrelse
  window.addEventListener("resize", () => {
    updateCenter();
    setDraggerPosition(angle);
  });

  // Initial call
  init();