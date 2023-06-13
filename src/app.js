let timePlaceholder = document.querySelector("#date");

let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
timePlaceholder.innerHTML = `${day} ${hours}:${minutes}`;

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", cityInput);

function cityInput(event) {
  event.preventDefault();

  let cityName = document.querySelector("#city-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${cityName.value}`;

  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  cityTemp.innerHTML = `${temperature}`;
  description.innerHTML = response.data.main.description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.main.wind;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function diplayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current");
  currentTemp.innerHTML = `${temperature}`;
}
