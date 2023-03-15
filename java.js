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

  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  creatingSearchHistory();
}

// Function to get search history from local storage
//initSearchHistory
function initSearchHistory() {
  var storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    userSearchHistory = JSON.parse(storedHistory);
  }
  creatingSearchHistory();
}

// Function to display the current weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather) {
  var date = dayjs().format('M/D/YYYY');
 