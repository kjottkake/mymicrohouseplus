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
                <td>{day.rainSum}</td>
                {/*https://www.w3schools.com/jsref/jsref_tolocalestring.asp for modifying the localestring to show which day it is and same with getting 00:00 instead of 00:00:00. Same with sunrise and sunset */}
                <td>{new Date(day.sunrise).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                  <td>{new Date(day.sunset).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>

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









