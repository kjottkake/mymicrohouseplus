import React from 'react';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      {hourlyData && hourlyData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Precipitation (mm)</th>
              <th>Rain (mm)</th>
              <th>Showers (mm)</th>
              <th>Snowfall (mm)</th>
              <th>Snow Depth (cm)</th>
              <th>Wind Speed (m/s)</th>
              <th>UV Index</th>
              <th>Time of Day</th>
              <th>Sunrise</th>
              <th>Sunset</th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((hour, index) => (
              <tr key={index}>
                <td>{hour.time}</td>
                <td>{hour.temperature_2m}</td>
                <td>{hour.precipitation}</td>
                <td>{hour.rain}</td>
                <td>{hour.showers}</td>
                <td>{hour.snowfall}</td>
                <td>{hour.snow_depth}</td>
                <td>{hour.wind_speed_10m}</td>
                <td>{hour.uv_index}</td>
                <td>{hour.is_day ? 'Day' : 'Night'}</td>
                <td>{new Date(hour.sunrise).toLocaleTimeString()}</td>
                <td>{new Date(hour.sunset).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hourly forecast data available.</p>
      )}
    </div>
  );
};

export default HourlyForecast;





