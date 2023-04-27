const form = document.querySelector('#location-form');
const input = document.querySelector('#location-input');
const loading = document.querySelector('#loading');
const current = document.querySelector('#current');
const temperature = document.querySelector('#temperature');
const condition = document.querySelector('#condition');
const icon = document.querySelector('#icon');
const forecast = document.querySelector('#forecast');

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = input.value;
  getWeather(location);
});

async function getWeather(location) {
  loading.classList.remove('hidden');
  current.classList.add('hidden');
  forecast.innerHTML = '';

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
  const data = await res.json();

  if (data.cod !== 200) {
    loading.classList.add('hidden');
    alert(data.message);
    return;
  }

  const { main, weather } = data;
  temperature.textContent = `${Math.round(main.temp)}°C`;
  condition.textContent = weather[0].description;
  icon.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;

  const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`);
  const forecastData = await forecastRes.json();

  if (forecastData.cod !== '200') {
    loading.classList.add('hidden');
    alert(forecastData.message);
    return;
  }

  forecastData.list.slice(0, 5).forEach(forecast => {
    const dayElem = document.createElement('div');
    dayElem.classList.add('day');

    const dayNameElem = document.createElement('div');
    dayNameElem.classList.add('day-name');
    dayNameElem.textContent = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

    const dayTempElem = document.createElement('div');
    dayTempElem.classList.add('day-temp');
    dayTempElem.textContent = `${Math.round(forecast.main.temp)}°C`;

    const dayIconElem = document.createElement('img');
    dayIconElem.classList.add('day-icon');
    dayIconElem.src = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

    dayElem.appendChild(dayNameElem);
    dayElem.appendChild(dayTempElem);
    dayElem.appendChild(dayIconElem);

    forecast.appendChild(dayElem);
  });

  loading.classList.add('hidden');
  current.classList.remove('hidden');
}
