// Weather.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';
import HourlyForecast from './HourlyForecast'; // Import the HourlyForecast component
import DailyForecast from './DailyForecast'; // Import the DailyForecast component

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
        current: 'temperature_2m,is_day,wind_speed_10m,uv_index,precipitation,snowfall,sunshine_duration',
        hourly: 'temperature_2m,precipitation,rain,showers,snowfall,snow_depth,wind_speed_10m,uv_index,is_day,sunshine_duration',
        daily: 'temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum',
        daily_days: 14,
      },
    });

    const { hourly, daily, current, ...rest } = response.data;

    // store hourly, daily, and current data separately in the state
    setWeatherData({
      hourly: hourly.time.map((time, index) => ({
        time: time,
        temperature_2m: hourly.temperature_2m[index],
        precipitation: hourly.precipitation[index],
        rain: hourly.rain[index],
        showers: hourly.showers[index],
        snowfall: hourly.snowfall[index],
        snow_depth: hourly.snow_depth[index],
        wind_speed_10m: hourly.wind_speed_10m[index],
        uv_index: hourly.uv_index[index],
        is_day: hourly.is_day[index],
        sunshine_duration: hourly.sunshine_duration[index],
      })),
      daily: daily.time,
      current,
      ...rest
    });
    
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
      <p>Time of day: {weatherData.current.is_day ? 'Day' : 'Night '}</p>
      <p>Wind Speed: {weatherData.current.wind_speed_10m} m/s</p>
      <p>UV Index: {weatherData.current.uv_index}</p>
      <p>Precipitation: {weatherData.current.precipitation} mm</p>
      <p>Snowfall: {weatherData.current.snowfall} mm</p>
      <p>Sunshine Duration: {weatherData.current.sunshine_duration} hours</p>
</div>


          {/* pass hourly and daily data as props */}
          <HourlyForecast hourlyData={weatherData.hourly} />
          <DailyForecast dailyData={weatherData.daily} />
        </div>
      )}
    </div>
  );
};

export default Weather;









