// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const API_URL = 'https://api.open-meteo.com/v1/forecast';

  const getWeather = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            latitude: latitude,
            longitude: longitude,
            current: 'temperature_2m,is_day,wind_speed_10m',
            hourly: 'temperature_2m,precipitation,rain,showers,snowfall,snow_depth,wind_speed_10m,uv_index,is_day,sunshine_duration',
            forecast_days: 14,
          },
        });
        console.log(response.data); // Log the entire response to the console
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    

  return (
    <div className="weather-container">
      <label>Latitude:</label>
      <input
        type="text"
        placeholder="Enter latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />

      <label>Longitude:</label>
      <input
        type="text"
        placeholder="Enter longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />

      <button onClick={getWeather}>Get Weather</button>

      {weatherData && (
        <div className="weather-info">
          <h2>Weather Information</h2>
          <div className="current-weather">
            <h3>Current Weather</h3>
            <p>Temperature: {weatherData.current.temperature_2m} °C</p>
            <p>Is Day: {weatherData.current.is_day ? 'Yes' : 'No'}</p>
            <p>Wind Speed: {weatherData.current.wind_speed_10m} m/s</p>
          </div>

          <div className="hourly-weather">
  <h3>Hourly Forecast</h3>
  {Array.isArray(weatherData.hourly) ? (
    <ul>
      {weatherData.hourly.map((hour, index) => (
        <li key={index}>
          Time: {hour.time}, Temperature: {hour.temperature_2m} °C
          {/* Add more hourly details as needed */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No hourly data available</p>
  )}
</div>

<div className="daily-forecast">
  <h3>Daily Forecast (Next 14 Days)</h3>
  {Array.isArray(weatherData.hourly) ? (
    <ul>
      {weatherData.hourly.map((day, index) => (
        <li key={index}>
          Date: {day.time}, Max Temperature: {day.temperature_2m_max} °C, Min Temperature: {day.temperature_2m_min} °C
          {/* Add more daily forecast details as needed */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No daily forecast data available</p>
  )}
</div>
        </div>
      )}
    </div>
  );
};

export default Weather;





