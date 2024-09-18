console.log(axios);
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let city = searchInput.value;
  let apikey = "db3364484d110at742a63o2f755d343b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;

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

let forecastHtml = "";
let days = ["Sun", "Mon", "Tue", "wed", "Thur", "Fri", "Sat"];
response.data.day.forEach(function (day) {
  forecastHtml =
    forecastHtml +
    `<div class="weather-forecast">
      <div class="weather-forecast-day">
        <div class="weather-forecast-date"></div>
        <div class="weather-forecast-icon"></div>
        <div class="weather-forecast-temperatures">
          <strong></strong>
        </div>
        <div class="weather-forecast-temperature"></div>
      </div>
    </div>`;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
});
displayForecast();

function displayForecast(response) {
  console.log(response.data);
}
getForecast(response.data.city);

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");

  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;

  temperatureElement.innerHTML = `${temperature}°c`;

  humidityElement.innerHTML = response.data.temperature.humidity;
}
