userSearchHistory = [];
weatherApiKeyLink = 'https://api.openweathermap.org';
weatherApi = '51ae5fde64c802c8bfda33f227ebd26d';

//search form
searchOutlet = document.querySelector('#user-search-form');
//search Input
userSearchPlacement = document.querySelector('#user-search-input');
//today Container
currentDayContainer = document.querySelector('#this-is-today');
//forecase Container
weatherContainer = document.querySelector('#forecast');
//search History Container
historyOfUserSearchContainer = document.querySelector('#history');

// Timezone conversion for Javascript.
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// Shows user's serach history results.
//render Search History
function creatingUserSearchHistory() {
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
  creatingUserSearchHistory();
}

// Function to get search history from local storage
//initSearchHistory
function initSearchHistory() {
   storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    userSearchHistory = JSON.parse(storedHistory);
  }
  creatingUserSearchHistory();
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


  // content into elements
  cardName.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
  weatherImage.setAttribute('src', iconUrl);
  weatherImage.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  elementOfHumidity.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(column);


// 5 day forecast
function renderForecast(dayForecast) {
  startDat = dayjs().add(1, 'day').startOf('day').unix();
  endDat = dayjs().add(6, 'day').startOf('day').unix();
//heading Col
  headingColumn = document.createElement('div');
  // heading
  heading = document.createElement('h4');

  headingColumn.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingColumn.append(heading);

  forecastContainer.innerHTML = '';
  forecastContainer.append(headingColumn);

  for (var i = 0; i < dayForecast.length; i++) {

    // First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
    if (dayForecast[i].dt >= startDat && dayForecast[i].dt < endDat) {

      // Then filters through the data and returns only data captured at noon for each day.
      if (dayForecast[i].dt_txt.slice(11, 13) == "12") {
        renderForecastCard(dayForecast[i]);
      }
    }
  }
}

function renderItems(city, data) {
  renderCurrentWeather(city, data.list[0], data.city.timezone);
  renderForecast(data.list);
}
//gets user data of city they are looking up and displays search.
function fetchWeather(location) {
  { latitude } location;
  { longitude } location;
  city = location.name;

  apiUrl = `${weatherApiKeyLink}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApi}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();

    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
  var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('Location not found');
      } else {
        appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function handleSearchFormSubmit(e) {
  // stops continuing search cycle.
  if (!searchInput.value) {
    return;
  }

  e.preventDefault();
  var search = searchInput.value.trim();
  fetchCoords(search);
  searchInput.value = '';
}

function handleSearchHistoryClick(e) {

  if (!e.target.matches('.btn-history')) {

    return;
  }

  btn = e.target;
  search = btn.getAttribute('data-search');
  fetchCoords(search);
}

initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);

return;


btn = e.target;
search = btn.getAttribute('data-search');
fetchCoords(search);

initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);