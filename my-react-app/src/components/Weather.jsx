import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import './HourlyForecast.css';
import './DailyForecast.css';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import DailyWeatherSquare from './DailyWeatherToggle';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState('60.78925');
  const [longitude, setLongitude] = useState('10.67254');
  const [location, setLocation] = useState('');

  const API_URL = 'https://api.open-meteo.com/v1/forecast';
  const SUNRISE_SUNSET_API_URL = 'https://api.sunrise-sunset.org/json';
  const REVERSE_GEOCODING_URL = 'https://nominatim.openstreetmap.org/reverse';

  const getWeather = async () => {
    try {
      // fetch sunrise and sunset times
      const sunriseSunsetResponse = await axios.get(SUNRISE_SUNSET_API_URL, {
        params: {
          lat: latitude,
          lng: longitude,
          formatted: 0,
        },
      });

      const { results: { sunrise, sunset } } = sunriseSunsetResponse.data;

      // fetch weather data
      const response = await axios.get(API_URL, {
        params: {
          latitude: latitude,
          longitude: longitude,
          current: 'temperature_2m,is_day,wind_speed_10m,uv_index,rain,snowfall',
          hourly: 'temperature_2m,rain,showers,snowfall,snow_depth,wind_speed_10m,uv_index,is_day',
          daily: 'temperature_2m_max,temperature_2m_min,rain_sum,',
          daily_days: 14,
        },
      });

      const { hourly, daily, current, ...rest } = response.data;

      // need to set the weather data in state. As it would NOT work when only some values were here...
      setWeatherData({
        hourly: hourly.time.map((time, index) => ({
          time: time,
          temperature_2m: hourly.temperature_2m[index],
          rain: hourly.rain[index],
          showers: hourly.showers[index],
          snowfall: hourly.snowfall[index],
          snow_depth: hourly.snow_depth[index],
          wind_speed_10m: hourly.wind_speed_10m[index],
          uv_index: hourly.uv_index[index],
          is_day: hourly.is_day[index],
        })),
        daily: daily.time.map((day, index) => ({
          date: day,
          maxTemperature: daily.temperature_2m_max[index],
          minTemperature: daily.temperature_2m_min[index],
          rainSum: daily.rain_sum[index],
          sunrise,
          sunset,
        })),
        current: {
          ...current,
          sunrise,
          sunset,
        },
        ...rest,
      });

      // reverse geocoding to get the location name
      const reverseGeocodingResponse = await axios.get(REVERSE_GEOCODING_URL, {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
        },
      });

      if (reverseGeocodingResponse.data.display_name) {
        setLocation(reverseGeocodingResponse.data.display_name);
      } else {
        setLocation('Location not found');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getWeather();
    }
  }, [latitude, longitude]);

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

      {weatherData && (
        <div className="weather-info">
          <h2>{location}</h2>
          <div className='current-weather'>
          <h3>Current Weather</h3>
          <p>Temperature: {weatherData.current.temperature_2m} °C</p>
          <p>Time of day: {weatherData.current.is_day ? 'Day' : 'Night '}</p>
          <p>Wind Speed: {weatherData.current.wind_speed_10m} m/s</p>
          <p>UV Index: {weatherData.current.uv_index}</p>
          <p>Rain: {weatherData.current.rain} mm</p>
          <p>Snowfall: {weatherData.current.snowfall} mm</p>
          <p>Sunrise: {new Date(weatherData.current.sunrise).toLocaleTimeString('en-gb', {hour: '2-digit', minute: '2-digit', hour12: false})}</p>
          <p>Sunset: {new Date(weatherData.current.sunset).toLocaleTimeString('en-gb', {hour: '2-digit', minute: '2-digit', hour12: false})}</p>
          </div>
          <DailyWeatherSquare dailyData={weatherData.daily} />
          <HourlyForecast hourlyData={weatherData.hourly} />
          
        </div>
      )}
    </div>
  );
};

export default Weather;












