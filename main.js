const api = {
    key:"9b387acff20d95cd5e090d1880026f3e",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
      getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);

       
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    localStorage.setItem('search', city.innerText);
    const saved = localStorage.getItem('search')
    var x = localStorage.getItem('search'); 
    

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    localStorage.setItem('searchCity', date.innerText);
    

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    
    localStorage.setItem('searchTemp', temp.innerHTML);
    

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    localStorage.setItem('searchW', weather_el.innerText);
    

    let range = document.querySelector('.range');
    range.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    
    localStorage.setItem('searchRange', range.innerText);
   
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;



}

  
