
const API_KEY = '';

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

    const response = await fetch(``);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const { name, main, weather } = data;
    locationName.textContent = name;
    currentTemperature.textContent = `${Math.round(main.temp)}°C`;
    currentCondition.textContent = weather[0].description;
    currentIcon.src = ``;

    const forecastResponse = await fetch(``);
    const forecastData = await forecastResponse.json();

    if (forecastData.cod !== '200') {
      throw new Error(forecastData.message);
    }

    const forecastDaysData = forecastData.list.filter((item) => item.dt_txt.includes('12:00:00'));
    forecastDaysData.forEach((dayData, index) => {
      const { dt_txt, main, weather } = dayData;
      const date = new Date(dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const iconUrl = 
      forecastDays[index].textContent = dayName;
      forecastTemperatures[index].textContent = `${Math.round(main.temp)}°C`;
      forecastIcons[index].src = iconUrl;
    });

    loading.classList.add('hidden');
    error.classList.add('hidden');
    weather.classList.remove('hidden');
  } catch (error) {
    loading.classList.add('hidden');
    error.textContent = error.message;
    error.classList.remove('hidden');
    weather.classList.add('hidden');
  }
}
