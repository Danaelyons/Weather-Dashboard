userSearchHistory = [];
weatherApiKeyLink = 'https://api.openweathermap.org';
weatherApiKey = '51ae5fde64c802c8bfda33f227ebd26d';

//search form
searchOutlet = document.querySelector('#search-form');
//search Input
userSearchPlacement = document.querySelector('#search-input');
//today Container
currentDayContainer = document.querySelector('#today');
//forecase Container
weatherContainer = document.querySelector('#forecast');
//search History Container
historyOfUserSearchContainer = document.querySelector('#history');

// Timezone conversion for Javascript.
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// Shows user's serach history results.
//render Search History
function creatingSearchHistory() {
          historyOfUserSearchContainer.innerHTML = '';

  // Shows most recent search at the top of search history.
  for (i = userSearchHistory.length - 1; i >= 0; i--) {
    btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn-history');

    btn.setAttribute('data-search', userSearchHistory[i]);
    btn.textContent = userSearchHistory[i];
    historyOfUserSearchContainer.append(btn);
  }
}

// Function to update history in local storage then updates displayed history.
//append to history
function attachHistory(search) {
  // If there is no search term return the function
  if (userSearchHistory.indexOf(search) !== -1) {
    return;
  }
  userSearchHistory.push(search);

  localStorage.setItem('search-history', JSON.stringify(userSearchHistory));
  creatingSearchHistory();
}

// Function to get search history from local storage
//initSearchHistory
function initSearchHistory() {
   storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    userSearchHistory = JSON.parse(storedHistory);
  }
  creatingSearchHistory();
}

// displays current data of weather from API.
function renderCurrentWeather(city, weather) {
  date = dayjs().format('M/D/YYYY');
}

//-----------------
// Store response data from our fetch request in variables
//tempF
temperatureFaren = weather.main.temp;
// windMph
windMileage = weather.wind.speed;
// humiidity 
humidityLevels = weather.main.humidity;
// iconUrl **help**
urlImage = 

// humidityEl
elementOfHumidity = document.createElement('p');
// card
card = document.createElement('div');
// heading
heading = document.createElement('h2');
// weatherIcon
weatherImage = document.createElement('img');
// windEl
elementOfWind = document.createElement('p');
// cardBody
cardBod = document.createElement('div');
//tempEl
elementTemp = document.createElement('p');

card.setAttribute('class', 'card');
cardBod.setAttribute('class', 'card-body');
card.append(cardBod);

heading.setAttribute('class', 'h3 card-title');
elementTemp.setAttribute('class', 'card-text');
elementOfWind .setAttribute('class', 'card-text');
elementOfHumidity.setAttribute('class', 'card-text');

heading.textContent = `${city} (${date})`;
weatherImage.setAttribute('src', urlImage);
weatherImage.setAttribute('class', 'weather-img');
heading.append(weatherImage)
elementTemp.textContent = `Temperature: ${temperatureFaren}°F`;
elementOfWind .textContent = `Wind: ${windMileage} MPH`;
elementOfHumidity.textContent = `Humidity: ${humidityLevels} %`;
cardBod.append(heading, elementTemp, elementOfWind, elementOfHumidity);

todayContainer.innerHTML = '';
todayContainer.append(card);

// displays forecast
function renderForecastCard(forecast) {
// data from api
temperatureFaren = forecast.main.temp;
humidityLevels = forecast.main.humidity;
windMileage = forecast.wind.speed;
}

  // Creating card elements.
  // col 
  column = document.createElement('div');
  card = document.createElement('div');
  cardBod = document.createElement('div');
  // cardTitle
  cardName = document.createElement('h5');
  weatherImage = document.createElement('img');
  elementTemp = document.createElement('p');
  elementOfWind  = document.createElement('p');
  elementOfHumidity = document.createElement('p');

  column.append(card);
  card.append(cardBod);
  cardBod.append(cardName, weatherImage, elementTemp, elementOfWind , elementOfHumidity);
  column.setAttribute('class', 'col-md');
  column.classList.add('five-day-card');
  card.setAttribute('class', 'card bg-primary h-100 text-white');
  cardBod.setAttribute('class', 'card-body p-2');
  cardName.setAttribute('class', 'card-title');
  elementTemp.setAttribute('class', 'card-text');
  elementOfWind.setAttribute('class', 'card-text');
  elementOfHumidity.setAttribute('class', 'card-text');

