function showTemperature(response) {
  let temperatureValue = document.querySelector("#temperature-value");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let icon = document.querySelector("#icon");
  let temperature = Math.round(response.data.temperature.current);
  let dateTime = document.querySelector("#date-time");
  let currentCity = document.querySelector(".current-city");
  let date = new Date(response.data.time * 1000);
  currentCity.innerHTML = response.data.city;
  description.textContent = response.data.condition.description;
  humidity.textContent = `${response.data.temperature.humidity}%`;
  windSpeed.textContent = `${response.data.wind.speed}km/h`;
  temperatureValue.textContent = `${temperature}°c`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  dateTime.textContent = showCurrentDate(date);

  displayForecast(response.data.city);
}

function showCurrentDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day},${month} ${hours}:${minutes}`;
}

function displayTemperature(city) {
  let apiKey = "db3364484d110at742a63o2f755d343b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchInputCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  displayTemperature(inputCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(city) {
  let apiKey = "db3364484d110at742a63o2f755d343b";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function showWeatherForecast(response) {
  let forecastHtml = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

     <img class="forecast-icon" src="${day.condition.icon_url}"/>
    <div class="weather-forecast-temperatures>
    <span class="weather-forecast-temperature"><strong class="extreme">${Math.round(
      day.temperature.maximum
    )}°C</strong></span>
    <span class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}°C</span>
    </div>
    </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}
let form = document.querySelector("form");
form.addEventListener("submit", searchInputCity);

displayTemperature("Johannesburg");
