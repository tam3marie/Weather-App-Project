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
  if (hours === 12) {
    currentTime.innerHTML = `${hours}:${minutes} PM`;
  }
  if (hours > 12) {
    currentTime.innerHTML = `${hours - 12}:${minutes} PM`;
  }
  if (hours < 12) {
    currentTime.innerHTML = `${hours}:${minutes} AM`;
  }
  currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;
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

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  if (hour > 12) {
    return `${hour - 12}PM`;
  }
  if (hour === 0) {
    return `12AM`;
  }
  if (hour < 12) {
    return `${hour}AM`;
  }
  if (hour === 12) {
    return `${hour}PM`;
  }
}

function displayForecastFahrenheit(response) {
  let forecastDailyData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastDailyData.forEach(function (forecastDay, index) {
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

function displayForecastCelsius(response) {
  let forecastDailyData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastDailyData.forEach(function (forecastDay, index) {
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

function displayHourlyForecastFahrenheit(response) {
  let forecastHourlyData = response.data.hourly;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastHourlyData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm">
      <div class="forecast-weekday">${formatHour(forecastDay.dt)}</div>
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
          forecastDay.temp
        )}<span>°F</span></span>/<span class="forecast-temp-low" id="forecast-low">${Math.round(
          ((forecastDay.temp - 32) * 5) / 9
        )}<span>°C</span></span>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecastFahrenheit() {
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=imperial`;
  axios.get(forecastApiUrl).then(displayForecastFahrenheit);
}
function getForecastCelsius() {
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecastCelsius);
}

function getHourlyForecastFahrenheit() {
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=imperial`;
  axios.get(forecastApiUrl).then(displayHourlyForecastFahrenheit);
}

function searchForCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input").value;
  if (searchCityInput) {
    search(searchCityInput);
  } else {
    alert(`Please enter a city.`);
  }
  displayFahrenheit();
}

function getBackgroundImage(response) {
  if (response === "01d" || response === "01n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Clear Sky.jpg')");
  }
  if (response === "02d" || response === "02n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Few Clouds.jpg')");
  }
  if (response === "03d" || response === "03n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Scattered Clouds.jpg')");
  }
  if (response === "04d" || response === "04n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Broken Clouds.jpg')");
  }
  if (response === "09d" || response === "09n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Shower Rain.jpg')");
  }
  if (response === "10d" || response === "10n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Rain.jpg')");
  }
  if (response === "11d" || response === "n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Thunderstorm.jpg')");
  }
  if (response === "13d" || response === "13n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Snow.jpg')");
  }
  if (response === "50d" || response === "50n") {
    return (document.getElementById("bg-weather-image").style.backgroundImage =
      "url('/src/images/Mist.jpg')");
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
  fahrenheitHigh = response.data.main.temp_max;
  fahrenheitLow = response.data.main.temp_min;
  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;
  let icon = response.data.weather[0].icon;
  getBackgroundImage(icon);
  getForecastFahrenheit();
  displayFiveDayForecast();
}

function currentCityLocation(event) {
  navigator.geolocation.getCurrentPosition(currentCityWeather);
}

function currentCityWeather(position) {
  let weatherApiKey = "f909d15f15ba4c8f6204927cf3507a71";
  let currentPositionWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}`;
  axios.get(currentPositionWeatherUrl).then(displayCurrentWeather);
  displayFahrenheit();
  displayFiveDayForecast();
}

function displayFahrenheit() {
  let currentTempF = document.querySelector("#current-degrees");
  currentTempF.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  fahrenheitLink.classList.remove("not-active");
  celsiusLink.classList.add("not-active");
  celsiusLink.classList.remove("active");
  document.querySelector("#high-temp").innerHTML = Math.round(fahrenheitHigh);
  document.querySelector("#low-temp").innerHTML = Math.round(fahrenheitLow);
  formatDateTime();
  getForecastFahrenheit();
}

function displayFahrenheitClick(event) {
  event.preventDefault();
  displayFahrenheit();
}

function displayCelsius() {
  let currentTempC = document.querySelector("#current-degrees");
  currentTempC.innerHTML = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  celsiusLink.classList.add("active");
  celsiusLink.classList.remove("not-active");
  fahrenheitLink.classList.add("not-active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#high-temp").innerHTML = Math.round(
    ((fahrenheitHigh - 32) * 5) / 9
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    ((fahrenheitLow - 32) * 5) / 9
  );
  document.querySelector("#current-time").innerHTML = militaryTime;
  displayFiveDayForecast();
  getForecastCelsius();
}

function displayCelsiusClick(event) {
  event.preventDefault();
  displayCelsius();
}

function displayFiveDayForecast() {
  fiveDayForecastLink.classList.add("active-daily-hourly");
  fiveDayForecastLink.classList.remove("not-active-daily-hourly");
  hourlyForecastLink.classList.add("not-active-daily-hourly");
  hourlyForecastLink.classList.remove("active-daily-hourly");
  document.querySelector("#five-day-forecast").innerHTML = "5 Day Forecast";
  document.querySelector("#hourly-forecast").innerHTML = "Switch to Hourly";
  getForecastFahrenheit();
}

function displayFiveDayForecastClick(event) {
  event.preventDefault();
  displayFiveDayForecast();
  displayFahrenheit();
}

function displayHourlyForcast() {
  hourlyForecastLink.classList.add("active-daily-hourly");
  hourlyForecastLink.classList.remove("not-active-daily-hourly");
  fiveDayForecastLink.classList.add("not-active-daily-hourly");
  fiveDayForecastLink.classList.remove("active-daily-hourly");
  document.querySelector("#five-day-forecast").innerHTML = "Switch to Daily";
  document.querySelector("#hourly-forecast").innerHTML = "Hourly Forecast";
  getHourlyForecastFahrenheit();
}

function displayHourlyForcastClick(event) {
  event.preventDefault();
  displayHourlyForcast();
}

let militaryTime = null;
let fahrenheitTemperature = null;
let fahrenheitHigh = null;
let fahrenheitLow = null;
let latitude = null;
let longitude = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitClick);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusClick);

let fiveDayForecastLink = document.querySelector("#five-day-forecast");
fiveDayForecastLink.addEventListener("click", displayFiveDayForecastClick);

let hourlyForecastLink = document.querySelector("#hourly-forecast");
hourlyForecastLink.addEventListener("click", displayHourlyForcastClick);

let h1 = document.querySelector("h1");
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchForCity);

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", currentCityLocation);

formatDateTime();
search("New York");
