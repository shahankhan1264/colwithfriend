function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;
  
  // Basic validation
  if (!email || !password) {
    showAlert('Please fill in all fields', 'warning');
    return;
  }
  
  if (!isValidEmail(email)) {
    showAlert('Please enter a valid email address', 'warning');
    return;
  }
  
  // Show loading state
  const submitBtn = document.querySelector('.login-btn');
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
  submitBtn.disabled = true;
  
  // Simulate login process
  setTimeout(() => {
    // Mock authentication
    if (email === 'admin@smartweb.com' && password === 'admin123') {
      showAlert('Login successful! Redirecting...', 'success');
      
      // Store login state if remember me is checked
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      }
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      showAlert('Invalid email or password', 'danger');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }, 2000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const form = document.querySelector('form');
  form.insertBefore(alertDiv, form.firstChild);
  
  // Auto dismiss after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

function togglePassword() {
  const passwordField = document.getElementById('password');
  const toggleBtn = document.querySelector('.password-toggle');
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    toggleBtn.textContent = '👁️';
  } else {
    passwordField.type = 'password';
    toggleBtn.textContent = '👁️‍🗨️';
  }
}

function socialLogin(provider) {
  showAlert(`${provider} login is not implemented yet`, 'info');
}

function forgotPassword() {
  const email = prompt('Enter your email address:');
  if (email && isValidEmail(email)) {
    showAlert('Password reset link sent to your email!', 'success');
  } else if (email) {
    showAlert('Please enter a valid email address', 'warning');
  }
}

// Load remembered email on page load
document.addEventListener('DOMContentLoaded', function() {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    document.getElementById('email').value = rememberedEmail;
    document.getElementById('remember').checked = true;
  }
  
  // Add demo credentials hint
  const demoHint = document.createElement('div');
  demoHint.className = 'alert alert-info mt-3';
  demoHint.innerHTML = '<small><strong>Demo:</strong> admin@smartweb.com / admin123</small>';
  document.querySelector('form').appendChild(demoHint);
});