const rotatingCircle = document.getElementById("rotatingCircle");
const activePhaseText = document.getElementById("activePhase");
const oplevBtn = document.getElementById("oplevelseBtn");

let angle = 0;
let isDragging = false;
let startX;

const phases = ["menstruation", "follikel", "ægløsning", "luteal"];

function updatePhase() {
  let index = Math.round(angle / 90) % 4;
  if (index < 0) index += 4;
  const phase = phases[index];

  activePhaseText.textContent = phase.charAt(0).toUpperCase() + phase.slice(1);
  oplevBtn.style.backgroundColor = phase === "ægløsning" ? "#ff69b4" : "#550000";

  document.body.style.backgroundColor = {
    menstruation: "#6e7e91",
    follikel: "#d3a4b1",
    ægløsning: "#f0b6d4",
    luteal: "#a38092"
  }[phase];
}

function onMouseDown(e) {
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
}

function onMouseMove(e) {
  if (!isDragging) return;
  const x = e.clientX || e.touches[0].clientX;
  const deltaX = x - startX;
  angle += deltaX * 0.5;
  rotatingCircle.style.transform = `rotate(${angle}deg)`;
  startX = x;
  updatePhase();
}

function onMouseUp() {
  isDragging = false;
}

rotatingCircle.addEventListener("mousedown", onMouseDown);
rotatingCircle.addEventListener("touchstart", onMouseDown);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);
window.addEventListener("touchend", onMouseUp);
