const titleElement = document.querySelector('.title');
const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardDescription = document.querySelector('.card-body .condition-temp .condition');
const cardTemp = document.querySelector('.card-body .card-mid .temp span');
const cardHi = document.querySelector('.card-body .condition-temp .high');
const cardLow = document.querySelector('.card-body .condition-temp .low');
const feelsLike = document.querySelector('.card-body .card-bottom .feel p');
const humidity = document.querySelector('.card-body .card-bottom .umidity p');

const geoLoc = document.querySelector('.icon-container img');
const iconContainer = document.querySelector('.icon-container');

const weather = {};
weather.temperature = {};


//WEATHER FOR INPUT SEARCH
updateWeatherApp = (city) => {
  console.log(city);
  const imageName = city.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${imageName}@2x.png`;
  cityName.textContent = city.name + ", " + city.sys.country;
  cardDescription.innerHTML = `${city.weather[0].description}`;
  cardTemp.innerHTML = `${Math.round(city.main.temp)}&degC`;
  cardHi.innerHTML = `${Math.round(city.main.temp_max)}&degC`;
  cardLow.innerHTML = `${Math.round(city.main.temp_min)}&degC`;
  feelsLike.innerHTML = `${Math.round(city.main.feels_like)}&degC`;
  humidity.innerHTML = `${city.main.humidity}%`;
  iconContainer.innerHTML = `
  <div class="icon-container card shadow mx-auto">
    <img src="${iconSrc}" click="displayWeather()" alt="" id="imgg">
  </div>
  `
}



// CHEK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  titleElement.innerHTML = "<p>Browser doesn't support Geolocation</p>"
}


//START FUNCTIONS FOR GEOLOCATION WEATHER
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

//STOP EVENT LISTENER IF USER DON'T ALLOW GEOLOCATION
function showError(){
  var el = document.getElementById('imgg'),
    elClone = el.cloneNode(true);

  el.parentNode.replaceChild(elClone,el);
}


function getWeather(lati, long){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&lang=it&appid=${key}`;
  console.log(api);

  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.round(data.main.temp);
      weather.description = data.weather[0].description;
      weather.city = data.name + ", " + data.sys.country;
      weather.tempMax = Math.round(data.main.temp_max);
      weather.tempMin = Math.round(data.main.temp_min);
      weather.feels = Math.round(data.main.feels_like);
      weather.humid = (data.main.humidity);
    });
}


//FUNCTION IF CLICK ON BUTTON
geoLoc.addEventListener('click', function displayWeather(){
    cityName.textContent = weather.city;
    cardDescription.innerHTML = weather.description;
    cardTemp.innerHTML = weather.temperature.value + "&degC";
    cardHi.innerHTML = weather.tempMax + "&degC";
    cardLow.innerHTML = weather.tempMin + "&degC";
    feelsLike.innerHTML = weather.feels + "&degC";
    humidity.innerHTML = weather.humid + "%";
  });



//ADD EVENT LISTENER TO THE FORM
searchForm.addEventListener('submit', e => {
  e.preventDefault();  //EVITA REFRESH PAGINA

  const citySearched = cityValue.value.trim();
  console.log(citySearched);
  searchForm.reset(); //RESET INPUT

  requestCity(citySearched)
  .then((data) => {
    updateWeatherApp(data);
  })
  .catch((error) => {console.log(error)})
})


