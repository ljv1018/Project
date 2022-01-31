let farenheitTemperature;

function search(event) {
  event.preventDefault();
  let name = document.querySelector("#city-name");
  let input = document.querySelector("#city-input");
  name.innerHTML = input.value;

  searchCity(input.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function formDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateTimeElement = document.querySelector("#date-time");
dateTimeElement.innerHTML = formDate(new Date());

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#card-title");
  // let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#card-title");
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function searchCity(city) {
  let apiKey = "3257cba831dc53108691784c4e5a6bf1";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "3257cba831dc53108691784c4e5a6bf1";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");

  document.querySelector("#city-name").innerHTML = response.data.name;

  farenheitTemperature = response.data.main.temp;
  document.querySelector("#card-title").innerHTML =
    Math.round(farenheitTemperature);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

searchCity("New York");
