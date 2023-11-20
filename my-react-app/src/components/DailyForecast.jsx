// DailyForecast.jsx
import React from 'react';

const DailyForecast = ({ dailyData }) => {
  return (
    <div className="daily-forecast">
      <h3>Daily Forecast (Next 7 Days)</h3>
      {dailyData && dailyData.length > 0 ? (
        <ul>
          {dailyData.map((day, index) => (
            <li key={index}>
              Date: {day.time}, Max Temperature: {day.temperature_2m_max} °C, Min Temperature: {day.temperature_2m_min} °C, Apparent Max Temperature: {day.apparent_temperature_max} °C, Apparent Min Temperature: {day.apparent_temperature_min} °C, Precipitation Sum: {day.precipitation_sum} mm, Rain Sum: {day.rain_sum} mm
            </li>
          ))}
        </ul>
      ) : (
        <p>No daily forecast data available.</p>
      )}
    </div>
  );
};

export default DailyForecast;








