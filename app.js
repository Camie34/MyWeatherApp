const API_KEY = '342689e1f0a53f1f55a9a83f8fc21c91';

const form = document.querySelector('form');
const input = document.querySelector('#search');
const loading = document.querySelector('#loading');
const error = document.querySelector('#error');
const weather = document.querySelector('#weather');
const locationName = document.querySelector('#location');
const currentTemperature = document.querySelector('#temperature');
const currentCondition = document.querySelector('#condition');
const currentIcon = document.querySelector('#icon');
const forecastDays = document.querySelectorAll('.day-name');
const forecastTemperatures = document.querySelectorAll('.day-temp');
const forecastIcons = document.querySelectorAll('.day-icon');
const citiesList = document.querySelector('#cities-list');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = input.value;
  await getWeather(location);
});

async function getWeather(location) {
  try {
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    weather.classList.add('hidden');

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const { name, main, weather } = data;
    locationName.textContent = name;
    currentTemperature.textContent = `${Math.round(main.temp)}°C`;
    currentCondition.textContent = weather[0].description;
    currentIcon.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;

    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`);
    const forecastData = await forecastResponse.json();

    if (forecastData.cod !== '200') {
      throw new Error(forecastData.message);
    }

    const forecastDaysData = forecastData.list.filter((item) => item.dt_txt.includes('12:00:00'));
    forecastDaysData.forEach((dayData, index) => {
      const { dt_txt, main, weather } = dayData;
      const date = new Date(dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const iconUrl = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
      forecastDays[index].textContent = dayName;
      forecastTemperatures[index].textContent = `${Math.round(main.temp)}°C`;
      forecastIcons[index].src = iconUrl;
    });

    loading.classList.add('hidden');
    weather.classList.remove('hidden');
  } catch (error) {
    console.error(error);
    error.textContent = 'Something went wrong. Please try again.';
    loading.classList.add('hidden');
    error.classList.remove('hidden');
  }
}

async function getCities() {
  try {
    const response = await fetch('http://localhost:3000/cities');
    const data = await response.json();

    data.cities.forEach(city => {
      const li = document.createElement('li');
      li.textContent = `${city.name}, ${city.country}`;
      citiesList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    error.textContent = 'Failed to load cities. Please try again.';
    error.classList.remove('hidden');
  }
}


error.classList.add('hidden');
