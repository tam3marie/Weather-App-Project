let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");
let timeDateNow = new Date();
let localtime = timeDateNow.toString();
let hours = timeDateNow.getHours();
let minutes = timeDateNow.getMinutes();
let day = days[timeDateNow.getDay()];
let month = months[timeDateNow.getMonth()];
let date = timeDateNow.getDate();
let year = timeDateNow.getFullYear();
currentDate.innerHTML = `${day}, ${month}, ${date}, ${year}`;
currentTime.innerHTML = `${hours}:${minutes}`;

function search(searchCityInput) {
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput}&units=imperial&appid=${weatherApiKey}`;
  axios.get(weatherApiUrl).then(showWeatherData);
}

function searchForCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input").value;
  if (searchCityInput) {
    search(searchCityInput);
  } else {
    alert(`Please enter a city.`);
  }
}
function showWeatherData(response) {
  console.log(response);
  let searchCityInput = document.querySelector("#search-city-input");
  searchCityInput.value = "";
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector(
    "h1"
  ).innerHTML = `Current Forcast for ${response.data.name}`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function currentCityLocation(event) {
  navigator.geolocation.getCurrentPosition(currentCityWeather);
}

function currentCityWeather(position) {
  console.log(position);
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let currentPositionWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}`;
  axios.get(currentPositionWeatherUrl).then(showWeatherData);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#current-degrees");
  currentTempF.innerHTML = "66";
  fahrenheit.style.textDecoration = "underline";
  celsius.style.textDecoration = "none";
}

function displayCelsius(event) {
  event.preventDefault();
  let currentTempC = document.querySelector("#current-degrees");
  currentTempC.innerHTML = "19";
  celsius.style.textDecoration = "underline";
  fahrenheit.style.textDecoration = "none";
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let h1 = document.querySelector("h1");
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchForCity);

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", currentCityLocation);

search("New York");
