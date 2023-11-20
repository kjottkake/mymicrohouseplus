// HourlyForecast.jsx
import React from 'react';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      {hourlyData && hourlyData.length > 0 ? (
        <ul>
          {hourlyData.map((hour, index) => (
            <li key={index}>
              Time: {hour.time}, Temperature: {hour.temperature_2m} °C, Precipitation: {hour.precipitation} mm, Rain: {hour.rain} mm, Showers: {hour.showers} mm, Snowfall: {hour.snowfall} mm, Snow Depth: {hour.snow_depth} cm, Wind Speed: {hour.wind_speed_10m} m/s, UV Index: {hour.uv_index}, Is Day: {hour.is_day ? 'Yes' : 'No'}, Sunshine Duration: {hour.sunshine_duration} hours
            </li>
          ))}
        </ul>
      ) : (
        <p>No hourly forecast data available.</p>
      )}
    </div>
  );
};

export default HourlyForecast;




