// call api
// choose city
// click past city
// return name, date, icon of weather, temp, humidity, wind speed, current cond.
// submit on form

var input = document.querySelector('input');
var cityList = document.querySelector('city-list');
var submit = document.querySelector('submit');

var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
var APIKey = 'cf638d62f048c40717f8d90412d83f56';
var cities = [];

fetch (requestURL)
  .then (function(response) {
    return response.json();
  })

function renderCities() {
  cityList.innerHTML = '';
  for (var i = 0; i < cities.length; i++) {
    var place = cities[i];
    var li = document.createElement('li');
    li.textContent = place;
    li.setAttribute('ATTRIBUTE', i);
    var button = document.createElement('button');
    button.textContent = 'Remove';
    li.appendChild(button);
    cityList.appendChild(li);
  }
};

function init() {
  var storedCities = JSON.parse(localStorage.getItem(cities));
  if (storedCities !== null) {
    cities = storedCities;
  }
  renderCities();
};

function storeCities() {
  localStorage.setItem('cities', JSON.stringify(cities));
};

submit.addEventListener('submit', function(event) {
  event.preventDefault();
  var cityText = input.value.trim();
  if (cityText ==='') {
    return;
  }
  cities.push(cityText);
  input.value = '';
  storeCities();
  renderCities();
});

citiesList.addEventListener('click', function(event) {
  var element = event.target;
  if (element.matches('button') === true) {
    var index =element.parentElement.getAttribute('ATTRIBUTE');
    cities.splice(index, 1);
    storeCities();
    renderCities();
  }
});

init();

