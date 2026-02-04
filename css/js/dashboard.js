// Dashboard animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  animateCounters();
  loadCharts();
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 40);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

function loadCharts() {
  // Simple progress circles
  const progressCircles = document.querySelectorAll('.progress-ring-circle');
  
  progressCircles.forEach(circle => {
    const percent = circle.getAttribute('data-percent');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  });
}

function updateDateTime() {
  const now = new Date();
  const dateTimeElement = document.getElementById('currentDateTime');
  
  if (dateTimeElement) {
    dateTimeElement.textContent = now.toLocaleString();
  }
}

function refreshDashboard() {
  // Simulate data refresh
  const loadingSpinner = document.createElement('div');
  loadingSpinner.innerHTML = '<div class="spinner-border" role="status"></div>';
  loadingSpinner.className = 'text-center p-3';
  
  document.body.appendChild(loadingSpinner);
  
  setTimeout(() => {
    loadingSpinner.remove();
    animateCounters();
    alert('Dashboard refreshed!');
  }, 2000);
}

function exportData() {
  // Simulate data export
  const data = {
    totalProjects: 25,
    completed: 20,
    inProgress: 3,
    clients: 15,
    exportDate: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dashboard-data.json';
  link.click();
}