// ====================================================
// GANTI WAKTU TARGET DI SINI kalau perlu (tahun, bulan, tanggal, jam)
// Format: new Date(TAHUN, BULAN-1, TANGGAL, JAM, MENIT, DETIK)
// Contoh di bawah = 13 Agustus 2026, jam 01:15 dini hari
// ====================================================
const target = new Date(2026, 7, 13, 1, 15, 0);

const timerEl = document.getElementById('timer');
const hintEl = document.getElementById('hint');
const envelope = document.getElementById('envelope');
const envelopeStage = document.getElementById('envelope-stage');
const revealStage = document.getElementById('reveal-stage');
const musicLink = document.getElementById('musicLink');
const musicPlayer = document.getElementById('musicPlayer');

function pad(n){ return String(n).padStart(2,'0'); }

envelope.addEventListener('click', openEnvelope);

if(musicLink && musicPlayer){
  musicLink.addEventListener('click', async (event) => {
    event.preventDefault();

    if(musicPlayer.paused){
      try{
        await musicPlayer.play();
        musicLink.textContent = 'lagu diputar';
      }catch(error){
        musicLink.textContent = 'klik lagi untuk putar';
      }
    } else {
      musicPlayer.pause();
      musicLink.textContent = 'putar lagu';
    }
  });
}

function renderCountdown(){
  const now = new Date();
  const diff = target - now;

  if(diff <= 0){
    openEnvelope();
    return;
  }

  const totalSeconds = Math.floor(diff/1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let big, unit;
  if(days > 0){ big = days; unit = 'hari lagi'; }
  else if(hours > 0){ big = pad(hours)+':'+pad(minutes); unit = 'jam:menit'; }
  else { big = pad(minutes)+':'+pad(seconds); unit = 'menit:detik'; }

  timerEl.innerHTML = big + '<span class="unit">' + unit + '</span>';
}

let opened = false;
function openEnvelope(){
  if(opened) return;
  opened = true;
  hintEl.textContent = 'membuka surat...';
  envelope.classList.add('open');

  if(musicPlayer && musicPlayer.paused){
    musicPlayer.play().then(() => {
      if(musicLink) musicLink.textContent = 'lagu diputar';
    }).catch(() => {
      if(musicLink) musicLink.textContent = 'klik link untuk putar lagu';
    });
  }

  setTimeout(() => {
    envelopeStage.style.transition = 'opacity .6s ease';
    envelopeStage.style.opacity = '0';
    setTimeout(() => {
      envelopeStage.style.display = 'none';
      revealStage.classList.add('show');
    }, 550);
  }, 1200);
}

renderCountdown();
setInterval(renderCountdown, 1000);

const slides = document.querySelectorAll('#photoFrame img.slide');
const dotsContainer = document.getElementById('dots');
if(slides.length > 1 && dotsContainer){
  slides[0].classList.add('active');
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(d);
  });
  const dotEls = dotsContainer.querySelectorAll('.dot');
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    dotEls[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    dotEls[current].classList.add('active');
  }, 3500);
} else if(slides.length === 1){
  slides[0].classList.add('active');
}

// ambient falling hearts
const petalContainer = document.getElementById('petals');
const petalChars = ['🤍','💗','💞','♡','♥'];
for(let i=0; i<22; i++){
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petalChars[Math.floor(Math.random()*petalChars.length)];
  p.style.left = Math.random()*100 + 'vw';
  p.style.fontSize = (10 + Math.random()*12) + 'px';
  p.style.animationDuration = (8 + Math.random()*10) + 's';
  p.style.animationDelay = (Math.random()*12) + 's';
  petalContainer.appendChild(p);
}
