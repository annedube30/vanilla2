console.log(axios);
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let city = searchInput.value;
  let apikey = "db3364484d110at742a63o2f755d343b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metri`;

  axios.get(apiUrl).then(displayTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minute}`;
}
let now = new Date();

let p = document.querySelector("#date-time");
p.innerHTML = formatDate(now);

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");

  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;

  temperatureElement.innerHTML = `${temperature}°c`;

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  timeElement.innerHTML = formatDate(date);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[days.getDay()];
}

function getForecast(city) {
  let apikey = "db3364484d110at742a63o2f755d343b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 8) {
      forecastHtml =
        forecastHtml +
        `<div class ="weather-forecast-day">
      <div class =weather-forecast-date">${formatDay(day.time)}</div>
      
      <img src ="${day.condition.icon_url}" class="weather-forecast-icon"/>
      <div class ="weather-forecast-temperatures">
      <div class ="weather-forecast-temperature">
      <strong>${Math.round(day.temperature.maximum)}°</strong></div>
      <div class = "weather-temperature-forecast">${Math.round(
        day.temperature.minimum
      )}°</div>
      </div>
      </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#search-form");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
