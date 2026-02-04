// Shared theme toggle functionality
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const btn = document.querySelector('.btn-outline-light');
  btn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  
  // Save theme preference
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const btn = document.querySelector('.btn-outline-light');
    if (btn) btn.textContent = '☀️';
  }
});