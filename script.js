const loading = document.getElementById("loading");
const app = document.getElementById("app");

const video = document.getElementById("camera");
const scanBtn = document.getElementById("scanBtn");

const status = document.getElementById("status");
const emfValue = document.getElementById("emfValue");
const bar = document.getElementById("bar");

const temp = document.getElementById("temp");
const energy = document.getElementById("energy");
const activity = document.getElementById("activity");

const log = document.getElementById("log");
const saveLog = document.getElementById("saveLog");

// ----------------------
// Loading screen
// ----------------------
setTimeout(() => {
  loading.style.display = "none";
  app.style.display = "block";
  startCamera();
  startLoop();
}, 2500);

// ----------------------
// Camera
// ----------------------
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });
    video.srcObject = stream;
  } catch (err) {
    console.log("Camera error:", err);
  }
}

// ----------------------
// Web Audio (ghost beeps)
// ----------------------
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function ghostBeep(freq = 200, duration = 0.1) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.type = "sine";

  gain.gain.value = 0.05;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// ----------------------
// EMF Simulation Loop
// ----------------------
let scanning = false;

function startLoop() {
  setInterval(() => {
    if (!scanning) return;

    let emf = Math.floor(Math.random() * 100);

    emfValue.textContent = emf + "%";
    bar.style.width = emf + "%";

    temp.textContent = (20 + Math.random() * 10).toFixed(1) + " °C";
    energy.textContent = emf + "%";

    if (emf > 70) {
      activity.textContent = "HIGH";
      status.textContent = "⚠ Anomaly Detected";
      ghostBeep(120 + emf * 2, 0.15);
    } else if (emf > 40) {
      activity.textContent = "MEDIUM";
      status.textContent = "Scanning...";
      ghostBeep(180, 0.08);
    } else {
      activity.textContent = "LOW";
      status.textContent = "Normal Field";
    }

  }, 800);
}

// ----------------------
// Scan button
// ----------------------
scanBtn.addEventListener("click", () => {
  scanning = !scanning;

  if (scanning) {
    scanBtn.textContent = "STOP SCAN";
    status.textContent = "Initializing Scan...";
  } else {
    scanBtn.textContent = "START SCAN";
    status.textContent = "System Idle";
    emfValue.textContent = "0%";
    bar.style.width = "0%";
  }
});

// ----------------------
// Save log
// ----------------------
saveLog.addEventListener("click", () => {
  localStorage.setItem("ghost_log", log.value);
  alert("Log saved locally");
});

// Load saved log
window.addEventListener("load", () => {
  const saved = localStorage.getItem("ghost_log");
  if (saved) log.value = saved;
});
