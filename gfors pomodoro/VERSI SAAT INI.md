v2.0.0
Js :
let timer;
let timeLeft = 1500;
let isRunning = false;
let mode = 'Focus';
const display = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const muteBtn = document.getElementById('mute');
const breakSound = document.getElementById('breakSound');

breakSound.volume = 0.3;

function updateDisplay() {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  display.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        autoSwitch();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = mode === 'Focus' ? 1500 : (mode === 'Break' ? 300 : 900);
  breakSound.pause();
  breakSound.currentTime = 0;
  updateDisplay();
}

function switchMode(newMode) {
  mode = newMode;
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.mode === newMode) tab.classList.add('active');
  });

  showAlert(newMode);

  if (newMode === 'Focus') {
    timeLeft = 1500;
    breakSound.pause();
    breakSound.currentTime = 0;
  } else {
    timeLeft = newMode === 'Break' ? 300 : 900;
    breakSound.play();
  }
  updateDisplay();
  startTimer();
}

function autoSwitch() {
  if (mode === 'Focus') {
    switchMode('Break');
  } else if (mode === 'Break') {
    switchMode('Long Break');
  } else {
    switchMode('Focus');
  }
}

function showAlert(newMode) {
  alert(`Mode sekarang: ${newMode}`);
}

startBtn.onclick = startTimer;
resetBtn.onclick = resetTimer;

document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => switchMode(tab.dataset.mode);
});

muteBtn.onclick = () => {
  breakSound.muted = !breakSound.muted;
  muteBtn.textContent = breakSound.muted ? '🔇' : '🔊';
};

updateDisplay();
