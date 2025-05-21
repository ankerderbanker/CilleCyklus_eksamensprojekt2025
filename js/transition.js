// --- Overgangsvideo-controller ---

const videoOverlay = document.createElement('div');
videoOverlay.style = `
  position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;
  background:black;display:none;justify-content:center;align-items:center;`;
videoOverlay.innerHTML = `<video id="transitionVideo" style="width:100vw;height:100vh;object-fit:cover;" preload="auto"></video>`;
document.body.appendChild(videoOverlay);

const transitionVideo = videoOverlay.querySelector('#transitionVideo');
let videoIsPlaying = false; // Forhindre dobbeltklik

// Fra-side → Til-side → video-filnavn (tilpasset til din /mp4/ mappe)
const videoMap = {
  'index.html': {
    '1menstruationsfasen.html': 'overgang-til-mens.mp4',
    '2follikelfasen.html':      'overgang-til-forllikel.mp4',
    '3egglosningsfasen.html':   'overgang-til-egglosning.mp4',
    '4lutealfasen.html':        'overgang-til-luteal.mp4',
  },
  '1menstruationsfasen.html': { '2follikelfasen.html': 'overgang-til-forllikel.mp4' },
  '2follikelfasen.html':      { '3egglosningsfasen.html': 'overgang-til-egglosning.mp4' },
  '3egglosningsfasen.html':   { '4lutealfasen.html':      'overgang-til-luteal.mp4' },
  '4lutealfasen.html':        { '1menstruationsfasen.html': 'overgang-til-mens.mp4' },
};

// --- Preload alle overgangsvideoer ---
function preloadTransitionVideos() {
  Object.values(videoMap).forEach(destMap => {
    Object.values(destMap).forEach(filename => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = '/mp4/' + filename;
      document.head.appendChild(link);
    });
  });
}
preloadTransitionVideos();

// --- Central navigation-funktion ---
function playTransitionAndNavigate(destination) {
  if (videoIsPlaying) return; // Dobbeltklik-beskyttelse
  videoIsPlaying = true;

  // Find navngivning af overgangsvideo
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const file = (videoMap[currentPage] && videoMap[currentPage][destination]) || null;

  if (!file) { window.location.href = destination; return; }

  // Vis overlay og disable knapper
  videoOverlay.style.display = 'flex';
  transitionVideo.src = '/mp4/' + file;
  transitionVideo.currentTime = 0;
  transitionVideo.play();

  disableNavButtons(true);

  // Navigér først når videoen slutter
  transitionVideo.onended = () => {
    videoOverlay.style.display = 'none';
    window.location.href = destination;
  };
}

// --- Disable/enable navigation-knapper (fælles class/nav-btn, næste-pil, oplev) ---
function disableNavButtons(disable = true) {
  document.querySelectorAll('.nav-btn, .next-arrow, .oplevelse-knap').forEach(btn => {
    btn.disabled = disable;
    btn.style.pointerEvents = disable ? 'none' : '';
    btn.style.opacity = disable ? 0.4 : 1;
  });
}

// --- Brug data-attributter for navigation på alle knapper ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-nav-to]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const dest = btn.getAttribute('data-nav-to');
      playTransitionAndNavigate(dest);
    });
  });
});
