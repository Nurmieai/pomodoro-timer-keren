let timer;
let timeLeft = 1500;
let isRunning = false;
let mode = 'Focus';

const display = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const breakSound = document.getElementById('breakSound');

const focusInput = document.getElementById('focusTime');
const breakInput = document.getElementById('breakTime');
const longInput = document.getElementById('longTime');

breakSound.volume = 0.3;

function updateDisplay() {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  display.textContent = `${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
  document.getElementById('modeName').textContent = `${mode} Time`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    if (mode !== 'Focus') breakSound.play();
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

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  breakSound.pause();
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  breakSound.pause();
  breakSound.currentTime = 0;
  setInitialTime();
  updateDisplay();
}

function setInitialTime() {
  if (mode === 'Focus') {
    timeLeft = parseInt(focusInput.value) * 60;
  } else if (mode === 'Break') {
    timeLeft = parseInt(breakInput.value) * 60;
  } else {
    timeLeft = parseInt(longInput.value) * 60;
  }
}

function switchMode(newMode) {
  if (mode === newMode) return;
  mode = newMode;
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.mode === newMode) tab.classList.add('active');
  });
  clearInterval(timer);
  isRunning = false;
  breakSound.pause();
  breakSound.currentTime = 0;
  setInitialTime();
  updateDisplay();
}

function autoSwitch() {
  if (mode === 'Focus') {
    mode = 'Break';
  } else if (mode === 'Break') {
    mode = 'Long Break';
  } else {
    mode = 'Focus';
  }
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.mode === mode) tab.classList.add('active');
  });
  setInitialTime();
  updateDisplay();
  startTimer();
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;

document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => switchMode(tab.dataset.mode);
});

muteBtn.onclick = () => {
  breakSound.muted = !breakSound.muted;
  muteBtn.textContent = breakSound.muted ? '🔇' : '🔊';
};

updateDisplay();
