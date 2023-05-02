# MyWeatherApp

A simple web application built using HTML, CSS, and JavaScript that displays the weather information of a specific city.

## Installation

To install this project, you can clone this repository using the following command:

bash

## Copy code

git clone git@github.com:Camie34/MyWeatherApp.git

## Usage

To use the project, open the index.html file in your web browser.

You can enter the name of a city in the search box and click on the search button to display the current weather information for that city.

## API Key

This project uses the OpenWeatherMap API to fetch the weather information. You need to have a valid API key to use this application.

To obtain an API key, follow these steps:

1. Go to the OpenWeatherMap website and sign up for an account.
2. After logging in, go to your API keys page.
3. Generate a new API key by entering a name for the key and 4. clicking on the "Generate" button.

Copy the API key and paste it in the apiKey variable in the app.js file.
## javascript

Copy code
const apiKey = "your_api_key_here";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

## Credits

The weather icons used in this project are from Icons8. 