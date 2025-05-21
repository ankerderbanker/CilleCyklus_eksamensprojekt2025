/* ---------- LOTTIE ---------- */
lottie.loadAnimation({
  container : document.getElementById('lottie'),
  renderer  : 'svg',
  loop      : true,
  autoplay  : true,
  path      : 'data.json'
});


/* ---------- PHASE → ICON FILE MAP ---------- */
const phaseIconBases = [
  {folder:'Fase1', base:'menstruation-icon'},
  {folder:'Fase2', base:'follikelfase-icon'},
  {folder:'Fase3', base:'ægløsning-icon'},
  {folder:'Fase4', base:'luteal-icon'}
];

const iconLayout = [
  {x:'88vw', y:'40vh', dir:'left'},
  {x:'15vw', y:'10vh', dir:'top'},
  {x:'74vw', y:'10vh', dir:'right'},
  {x:'5vw',  y:'44vh', dir:'left'},
  {x:'15vw', y:'78vh', dir:'bottom'},
  {x:'74vw', y:'70vh', dir:'right'}
];

/* ---------- BUILD ICON ELEMENTS ---------- */
const bgIconsEl = document.getElementById('bgIcons');
const phaseImgs = phaseIconBases.map((p,idx)=>{
  return iconLayout.map((pos,i)=>{
    const img = document.createElement('img');
    img.src = `images/baggrund/${p.folder}/${p.base}${i+1}.svg`;
    img.className = 'bgIcon';
    img.style.left = pos.x;
    img.style.top  = pos.y;

    switch(pos.dir){
      case 'left':   img.dataset.init='translateX(-120vw) scale(.7)'; break;
      case 'right':  img.dataset.init='translateX(120vw)  scale(.7)'; break;
      case 'top':    img.dataset.init='translateY(-120vh) scale(.7)'; break;
      case 'bottom': img.dataset.init='translateY(120vh)  scale(.7)'; break;
    }
    img.style.transform = img.dataset.init;
    bgIconsEl.appendChild(img);
    return img;
  });
});

function togglePhaseIcons(activeIdx){
  phaseImgs.forEach((set,idx)=>{
    const show = idx === activeIdx;
    set.forEach(img=>{
      img.style.opacity   = show ? 1 : 0;
      img.style.transform = show ? 'translate(0,0) scale(1)' : img.dataset.init;
    });
  });
}

/* ---------- FASE DATA OG FARVER ---------- */
const phases = [
  {name:'Menstruation',  color:'#925048'},
  {name:'Follikelfasen', color:'#c2858c'},
  {name:'Ægløsning',     color:'#8DA1BD'},
  {name:'Lutealfasen',   color:'#6F8095'}
];

/* ---------- SVG INTERAKTION ---------- */
const svg          = document.getElementById('scene');
const handleGroup  = document.getElementById('handle');
const handleCircle = document.getElementById('handleCircle');
const handleText   = document.getElementById('handleText');

const CENTER = {x:250,y:250};
const RADIUS = 170;
const STROKE = 40;
const OUTER_R = RADIUS + STROKE/2 + 40;

let currentPhaseIdx = null;
let dragging=false, dragMoved=false, dragStartPt={x:0,y:0};

/* init */
placeHandleAtAngle(0,true);
updateBackground(null);

/* events */
handleCircle.addEventListener('pointerdown', pointerDown);
handleCircle.addEventListener('click',        onHandleClick);

function pointerDown(e){
  dragging=true;dragMoved=false;dragStartPt={x:e.clientX,y:e.clientY};
  handleCircle.setPointerCapture(e.pointerId);
  handleCircle.style.transform='scale(.7)';handleText.style.display='none';
  document.addEventListener('pointermove', pointerMove);
  document.addEventListener('pointerup',   pointerUp);
}
function pointerMove(e){
  if(!dragging) return;
  if(!dragMoved && Math.hypot(e.clientX-dragStartPt.x,e.clientY-dragStartPt.y)>3) dragMoved=true;
  const loc = clientToSvg(e.clientX,e.clientY);
  const ang = pointToAngle(loc.x,loc.y);
  placeHandleAtAngle(ang);
  const idx = angleToPhase(ang);
  if(idx!==currentPhaseIdx){highlightPhase(idx);currentPhaseIdx=idx;}
}
function pointerUp(e){
  dragging=false;handleCircle.releasePointerCapture(e.pointerId);
  document.removeEventListener('pointermove',pointerMove);
  document.removeEventListener('pointerup',pointerUp);
  const loc=clientToSvg(e.clientX,e.clientY),dist=pointDist(loc,CENTER);
  Math.abs(dist-OUTER_R)<STROKE ? snapToPhase(currentPhaseIdx) : resetToTop();
}


function onHandleClick(){
  if(!dragMoved && handleText.style.display !== "none" && currentPhaseIdx !== null){
    const targetPages = [
      '1menstruationsfasen.html',
      '2follikelfasen.html',
      '3egglosningsfasen.html',
      '4lutealfasen.html'
    ];
    window.location.href = targetPages[currentPhaseIdx];
  }
}


/* ---------- VISUAL LOGIK ---------- */
function placeHandleAtAngle(angle,forceSmall=false){
  const rad=(angle-90)*Math.PI/180;
  handleGroup.setAttribute('transform',
    `translate(${CENTER.x+OUTER_R*Math.cos(rad)},${CENTER.y+OUTER_R*Math.sin(rad)})`);
  if(forceSmall){handleCircle.style.transform='scale(.7)';handleText.style.display='none';}
}
function highlightPhase(idx){
  for(let i=0;i<4;i++){
    document.getElementById(`phaseImg${i}`).classList.toggle('active',i===idx);
  }
  togglePhaseIcons(idx);
  updateBackground(idx);
}
function snapToPhase(idx){
  placeHandleAtAngle(idx*90+45);
  handleCircle.style.transform='scale(1)';handleText.style.display='block';
  updateBackground(idx);
}
function resetToTop(){
  currentPhaseIdx=null;
  for(let i=0;i<4;i++){document.getElementById(`phaseImg${i}`).classList.remove('active');}
  togglePhaseIcons(-1);
  placeHandleAtAngle(0,true);
  updateBackground(null);
}

/* ---------- BAGGRUNDSFARVE funktion her ændres også startfarven ---------- */
function updateBackground(idx){
  document.body.style.background = idx===null ? '#a36a73' : phases[idx].color;
}

/* ---------- HELPERS ---------- */
function clientToSvg(x,y){ const pt=svg.createSVGPoint();pt.x=x;pt.y=y;return pt.matrixTransform(svg.getScreenCTM().inverse()); }
function pointToAngle(x,y){return (Math.atan2(y-CENTER.y,x-CENTER.x)*180/Math.PI+90+360)%360;}
function angleToPhase(angle){return Math.floor(angle/90)%4;}
function pointDist(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
