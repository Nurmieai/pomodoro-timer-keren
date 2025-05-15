<!-- CHANGELOG v2.1.0 -->
Pindah tab nggak auto-start timer.

Musik baru nyala saat Start di Break/Long Break.

Reset tetap stop musik.

Alert tetap muncul tiap pindah mode/tab.

Js :
let timer;
let timeLeft = 10;
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
    if (mode !== 'Focus') {
      breakSound.play();
    }
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

  if (mode === 'Focus') {
    breakSound.pause();
    breakSound.currentTime = 0;
    timeLeft = 1500;
  } else if (mode === 'Break') {
    timeLeft = 300;
  } else {
    timeLeft = 900;
  }

  clearInterval(timer);
  isRunning = false;
  updateDisplay();
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


<!-- 📦 Changelog Update v2.0.0 -->
🌸 UI Update:
Ganti tombol jadi modern soft rounded + shadow.

Tambahin tab mode di atas timer (Pomodoro, Short Break, Long Break).

Ganti tombol Reset jadi icon 🔄.

Tambah icon mute/unmute musik 🔊/🔇 di samping tombol Start.

🎵 Audio Update:
Musik otomatis play saat masuk Break / Long Break.

Musik otomatis stop saat Reset.

Tombol mute/unmute buat kendali manual musik.

⚙️ Fitur Update:
Mode pindah via klik tab.

Saat mode berpindah (otomatis/manual), muncul alert seperti sebelumnya.

Timer otomatis mulai saat pindah ke mode Break / Long Break.

Musik replay otomatis loop true.
js:
let timer;
let timeLeft = 10;
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

<!-- CHANGELOG v1.2.0 -->
js:
let timer;
let timeLeft = 1500;
let isRunning = false;
let mode = 'Focus';
let sessions = 0;

const display = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const breakSound = document.getElementById('breakSound');
const tabs = document.querySelectorAll('.tab');

breakSound.volume = 0.2;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        breakSound.play();

        if (mode === 'Focus') {
          sessions++;
          if (sessions % 3 === 0) {
            switchMode('Long Break');
          } else {
            switchMode('Break');
          }
        } else {
          switchMode('Focus');
        }
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;

  if (mode === 'Focus') timeLeft = 1500;
  else if (mode === 'Break') timeLeft = 300;
  else timeLeft = 900;

  breakSound.pause();
  breakSound.currentTime = 0;
  updateDisplay();
}

function switchMode(newMode) {
  mode = newMode;

  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[data-mode="${newMode}"]`).classList.add('active');

  resetTimer();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchMode(tab.dataset.mode);
  });
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();

<!-- CHANGELOG v1.1.0 -->

let timer;
let timeLeft = 1500;
let isRunning = false;
let mode = 'Focus';
let sessions = 0;

const display = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const breakSound = document.getElementById('breakSound');
const tabs = document.querySelectorAll('.tab');

breakSound.volume = 0.2;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

        if (mode === 'Focus') {
          sessions++;
          if (sessions % 3 === 0) {
            switchMode('Long Break');
          } else {
            switchMode('Break');
          }
        } else {
          switchMode('Focus');
        }
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;

  if (mode === 'Focus') timeLeft = 1500;
  else if (mode === 'Break') timeLeft = 300;
  else timeLeft = 900;

  breakSound.pause();
  breakSound.currentTime = 0;
  updateDisplay();
}

function showModeAlert(newMode) {
  const modal = document.getElementById('modeAlert');
  const title = document.getElementById('alertTitle');
  const message = document.getElementById('alertMessage');

  title.textContent = "Mode Berganti!";
  message.textContent = `Sekarang masuk ke mode: ${newMode}`;

  modal.style.display = "block";
  setTimeout(() => {
    modal.style.display = "none";
  }, 3500);
}

function switchMode(newMode) {
  mode = newMode;

  // Highlight tab
  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[data-mode="${newMode}"]`).classList.add('active');

  // Tampilkan alert
  showModeAlert(newMode);

  // Atur timer sesuai mode
  if (mode === 'Focus') {
    timeLeft = 1500;
    breakSound.pause();
    breakSound.currentTime = 0;
  } else if (mode === 'Break') {
    timeLeft = 300;
    breakSound.play();
    breakSound.loop = true;
  } else if (mode === 'Long Break') {
    timeLeft = 900;
    breakSound.play();
    breakSound.loop = true;
  }

  updateDisplay();
  resetTimer();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchMode(tab.dataset.mode);
  });
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Modal close button
document.getElementById('closeModal').onclick = function () {
  document.getElementById('modeAlert').style.display = "none";
};

updateDisplay();
