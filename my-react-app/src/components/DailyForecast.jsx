import React from 'react';

const DailyForecast = ({ dailyData }) => {
  return (
    <div className="daily-forecast">
      <h3>Daily Forecast</h3>
      {dailyData && dailyData.length > 0 ? (
        <ul>
        {dailyData.map((day, index) => (
      <li key={index}>
      Date: {day.date},
      Max Temperature: {day.maxTemperature} °C,
      Min Temperature: {day.minTemperature} °C,
      Apparent Max Temperature: {day.apparentMaxTemperature} °C,
      Apparent Min Temperature: {day.apparentMinTemperature} °C,
      Precipitation Sum: {day.precipitationSum} mm,
      Rain Sum: {day.rainSum} mm,
      Sunrise: {new Date(day.sunrise).toLocaleTimeString()},
      Sunset: {new Date(day.sunset).toLocaleTimeString()}
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









