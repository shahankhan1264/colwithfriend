function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let terms = document.getElementById("terms").checked;

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (name === "") {
    alert("Name is required");
    return false;
  }

  if (!email.match(emailPattern)) {
    alert("Enter valid email");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return false;
  }

  if (!terms) {
    alert("Please accept terms & conditions");
    return false;
  }

  alert("Registration Successful!");
  return true;
}
function filterImages(category) {
  let items = document.getElementsByClassName("gallery-item");

  for (let i = 0; i < items.length; i++) {
    if (category === "all") {
      items[i].style.display = "block";
    } else if (items[i].classList.contains(category)) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
}
/* 🔹 Digital Clock */
setInterval(() => {
  let now = new Date();
  document.getElementById("clock").innerHTML =
    now.toLocaleTimeString();
}, 1000);

/* 🔹 Calculator */
const display = document.getElementById("input1");
const buttons = document.querySelectorAll("#calculatorbutten button");

// Button click support
buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    const val = btn.dataset.value || btn.innerText;

    if (val === "C") {
      display.value = "";
      return;
    }

    if (val === "=") {
      calculate();
      return;
    }

    display.value += val;
  });
});

// Keyboard support (type 2+2 and press Enter)
display.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    calculate();
  }
});

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

/* 🔹 To-Do List */
let taskList = document.getElementById("taskList");

function addTask() {
  let taskInput = document.getElementById("taskInput");

  if (taskInput.value === "") {
    alert("Enter task");
    return;
  }

  let li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.innerHTML = `
    ${taskInput.value}
    <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">X</button>
  `;
  taskList.appendChild(li);
  taskInput.value = "";
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};
async function getWeather() {
  let city = document.getElementById("city").value;
  let result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = "<p class='text-danger'>Please enter a city</p>";
    return;
  }

  try {
    // Step 1: City → Latitude & Longitude
    let geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    let geoData = await geoRes.json();

    if (!geoData.results) {
      result.innerHTML = "<p class='text-danger'>City not found</p>";
      return;
    }

    let lat = geoData.results[0].latitude;
    let lon = geoData.results[0].longitude;

    // Step 2: Weather Data
    let weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    let weatherData = await weatherRes.json();

    let temp = weatherData.current_weather.temperature;
    let wind = weatherData.current_weather.windspeed;

    result.innerHTML = `
      <h4>${city.toUpperCase()}</h4>
      <p>🌡️ Temperature: <b>${temp}°C</b></p>
      <p>💨 Wind Speed: <b>${wind} km/h</b></p>
    `;

  } catch (error) {
    result.innerHTML = "<p class='text-danger'>Error fetching data</p>";
  }
}



