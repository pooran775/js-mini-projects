document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const feelsLikeDisplay = document.getElementById("feels-like");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  //Get the API key from the open weather map
  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables

  getWeatherBtn.addEventListener("click", fetchWeatherData);
  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData();
    }
  });

  async function fetchWeatherData() {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      //gets the data
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(" City Not found");
      }
      const weatherData = await response.json();
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    feelsLikeDisplay.textContent = `Feels Like : ${main.feels_like}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
