import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);

  const [city, setCity] = useState("");

  const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const searchWeather = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);

      setCity("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Weather App</h1>

      <form onSubmit={searchWeather} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {weatherData && (
        <div className="weather-data">
          <h2 className="city-name">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
          <p className="feels-like">
            Feels like: {weatherData.main.feels_like}°C
          </p>
          <p className="weather-description">
            Weather: {weatherData.weather[0].description}
          </p>
          <p className="wind-speed">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
