function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  
  showLoading();
  
  // Simulate API call delay
  setTimeout(() => {
    // Mock weather data (replace with real API)
    const mockData = {
      city: city,
      temperature: Math.floor(Math.random() * 30) + 10,
      description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Snowy'][Math.floor(Math.random() * 5)],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: getWeatherIcon(['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Snowy'][Math.floor(Math.random() * 5)])
    };
    
    hideLoading();
    displayWeather(mockData);
  }, 1500);
}

function showLoading() {
  document.getElementById('weatherResult').innerHTML = `
    <div class="loading-spinner"></div>
    <p class="text-center">Loading weather data...</p>
  `;
  document.getElementById('weatherResult').style.display = 'block';
}

function hideLoading() {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.remove();
  }
}

function displayWeather(data) {
  document.getElementById('weatherResult').innerHTML = `
    <div class="weather-card text-center">
      <h4>${data.city}</h4>
      <div class="weather-icon">${data.icon}</div>
      <div class="temperature">${data.temperature}°C</div>
      <p class="lead">${data.description}</p>
      
      <div class="weather-details">
        <div class="row">
          <div class="col-6">
            <strong>Humidity</strong><br>
            ${data.humidity}%
          </div>
          <div class="col-6">
            <strong>Wind Speed</strong><br>
            ${data.windSpeed} km/h
          </div>
        </div>
      </div>
    </div>
  `;
}

function getWeatherIcon(condition) {
  const icons = {
    'Sunny': '☀️',
    'Cloudy': '☁️',
    'Rainy': '🌧️',
    'Partly Cloudy': '⛅',
    'Snowy': '❄️'
  };
  return icons[condition] || '🌤️';
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Mock reverse geocoding
        const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        
        document.getElementById('cityInput').value = randomCity;
        getWeather();
      },
      (error) => {
        alert('Unable to get your location. Please enter a city manually.');
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Add enter key support
document.addEventListener('DOMContentLoaded', function() {
  const cityInput = document.getElementById('cityInput');
  if (cityInput) {
    cityInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        getWeather();
      }
    });
  }
});