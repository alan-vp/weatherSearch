const input = document.querySelector('input[name=location]');
const button = document.querySelector('input[type=submit]');
const form = document.querySelector('.weather');
const cityH2 = document.querySelector('.city-name');
const maxTemph3 = document.querySelector('.max-temp');
const minTemph3 = document.querySelector('.min-temp');
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.weather-description');
const noLocation = document.querySelector('.no-location');
const weatherCard = document.querySelector('.weather-card');


const apiKey = '5e09eff283f6ffc678ad2f5360e73b4a';
const url = "http://api.openweathermap.org/geo/1.0/direct?q=puebla&appid=";


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = input.value;
  //console.log('submiting');
  apiCall(city);
});

const apiCall = (city) => {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    if (data.length == 0) {
      weatherCard.style.display = "none";

      noLocation.innerText = "There is no location with that name, try another one";
    } else {
      console.log('geolocation:', data);
      data.forEach(country => {
        console.log(country.name);
        //const country = country.name;
        const latitude = country.lat;
        const longitude = country.lon;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)

        .then(response => response.json())
        .then(data => {
          console.log(data);
          const maxTemp = data.main.temp_max;
          const minTemp = data.main.temp_min;
          const weather = data.weather[0].main;
          const icon = data.weather[0].icon;
          console.log(icon);
          weatherCard.style.display = "flex";
          cityH2.innerText = country.name;
          maxTemph3.innerText = `Max: ${maxTemp}°`;
          minTemph3.innerText = `Min: ${minTemp}°`;
          weatherDescription.innerText = weather;
          weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
          weatherIcon.style.display = "block";
          noLocation.innerText = "";
          input.value = "";
          // console.log(icon);
          // console.log('data:', data)
          // console.log('wheater:', data.weather[0].main);
          // console.log('icon:', data.weather[0].icon);
          // console.log('temperature', data.main.temp);
        })
      })
    }
  })
}




//	.catch(err => console.error(err));
