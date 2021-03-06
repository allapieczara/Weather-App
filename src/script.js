let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let monthDay = now.getDate();
let time = now.getHours() + ":" + now.getMinutes();

function todaysDate() {
  let dateToChange = document.querySelector("#today-date");
  dateToChange.innerHTML = `${today} ${time}`;
}
todaysDate();

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;
  let cityChange = document.querySelector("#current-city");
  cityChange.innerHTML = city;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "b015cb71b14a6b0a5f7551a9ef540747";
  let metric = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}${metric}`;

  axios.get(apiUrl).then(showTemperature);
}

function geolocator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", geolocator);

function showTemperatureCity(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;
  let cityChange = document.querySelector("#current-city");
  cityChange.innerHTML = city;
}

function citySearched(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  let cityName = input.value;
  let apiKey = "b015cb71b14a6b0a5f7551a9ef540747";
  let metric = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}${metric}`;

  axios.get(apiUrl).then(showTemperatureCity);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearched);
