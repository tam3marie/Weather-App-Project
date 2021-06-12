function formatDateTime() {
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (hours > 12) {
    currentTime.innerHTML = `${hours - 12}:${minutes} PM`;
  } else {
    currentTime.innerHTML = `${hours}:${minutes} AM`;
  }
  currentDate.innerHTML = `${day}, ${month}, ${date}, ${year}`;
  militaryTime = `${hours}:${minutes}`;
}

function search(searchCityInput) {
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput}&units=imperial&appid=${weatherApiKey}`;
  axios.get(weatherApiUrl).then(displayCurrentWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
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
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.hourly);
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm">
      <div class="forecast-weekday">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt="${forecastDay.weather[0].description}"
        class="forcast-icon"
        width="42"
      />
      <div class="forcast-temps">
        <span class="forecast-temp-high" id="forecast-high">${Math.round(
          forecastDay.temp.max
        )}</span>
        /
        <span class="forecast-temp-low" id="forecast-low">${Math.round(
          forecastDay.temp.min
        )}</span>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${weatherApiKey}&units=imperial`;
  axios.get(forecastApiUrl).then(displayForecast);
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
function displayCurrentWeather(response) {
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
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function currentCityLocation(event) {
  navigator.geolocation.getCurrentPosition(currentCityWeather);
}

function currentCityWeather(position) {
  console.log(position);
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let currentPositionWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}`;
  axios.get(currentPositionWeatherUrl).then(displayCurrentWeather);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#current-degrees");
  currentTempF.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  fahrenheitLink.classList.remove("not-active");
  celsiusLink.classList.add("not-active");
  celsiusLink.classList.remove("active");
  formatDateTime();
}

function displayCelsius(event) {
  event.preventDefault();
  let currentTempC = document.querySelector("#current-degrees");
  currentTempC.innerHTML = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  celsiusLink.classList.add("active");
  celsiusLink.classList.remove("not-active");
  fahrenheitLink.classList.add("not-active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-time").innerHTML = militaryTime;
}

let militaryTime = null;
let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let h1 = document.querySelector("h1");
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchForCity);

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", currentCityLocation);

formatDateTime();
search("New York");
