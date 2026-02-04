let stopwatchInterval;
let stopwatchTime = 0;
let isRunning = false;

function updateClock() {
  const now = new Date();
  
  // Digital clock
  const timeString = now.toLocaleTimeString();
  document.getElementById('digitalClock').textContent = timeString;
  
  // Date display
  const dateString = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  document.getElementById('dateDisplay').textContent = dateString;
  
  // Analog clock
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;
  
  document.getElementById('hourHand').style.transform = `rotate(${hourAngle}deg)`;
  document.getElementById('minuteHand').style.transform = `rotate(${minuteAngle}deg)`;
  document.getElementById('secondHand').style.transform = `rotate(${secondAngle}deg)`;
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatchDisplay();
    }, 1000);
  }
}

function pauseStopwatch() {
  isRunning = false;
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
  const hours = Math.floor(stopwatchTime / 3600);
  const minutes = Math.floor((stopwatchTime % 3600) / 60);
  const seconds = stopwatchTime % 60;
  
  const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('stopwatch').textContent = display;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call