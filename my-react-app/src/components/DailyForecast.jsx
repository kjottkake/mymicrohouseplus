import React from 'react';

const DailyForecast = ({ dailyData }) => {
  return (
    <div className="daily-forecast">
      <h3>Daily Forecast</h3>
      {dailyData && dailyData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Max Temperature (°C)</th>
              <th>Min Temperature (°C)</th>
              <th>Precipitation Sum (mm)</th>
              <th>Rain Sum (mm)</th>
              <th>Sunrise</th>
              <th>Sunset</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.map((day, index) => (
              <tr key={index}>
                <td>{new Date(day.date).toLocaleDateString('en-GB')}</td>
                <td>{day.maxTemperature}</td>
                <td>{day.minTemperature}</td>
                <td>{day.precipitationSum}</td>
                <td>{day.rainSum}</td>
                <td>{new Date(day.sunrise).toLocaleTimeString('en-GB')}</td>
                <td>{new Date(day.sunset).toLocaleTimeString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No daily forecast data available.</p>
      )}
    </div>
  );
};

export default DailyForecast;









