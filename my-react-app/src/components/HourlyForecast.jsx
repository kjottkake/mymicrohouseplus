import React from 'react';
import snowIcon from '../assets/snowycloud.webp'

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
              <th>Rain (mm)</th>
              <th>Showers (mm)</th>
              <th>Snowfall (mm)</th>
              <th>Snow Depth (cm)</th>
              <th>Wind Speed (m/s)</th>
              <th>UV Index</th>
              <th>Time of day</th>              
            </tr>
          </thead>
          <tbody>
            {/*https://www.w3schools.com/jsref/jsref_tolocalestring.asp for modifying the localestring to show which day it is and same with getting 00:00 instead of 00:00:00 */}
            {hourlyData.map((hour, index) => (
              <tr key={index}>
                 <td>{new Date(hour.time).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric' })}</td>
                <td>{hour.temperature_2m}</td>
                <td>{hour.rain}</td>
                <td>{hour.showers}</td>
                <td>{hour.snowfall > 0 ? (
                  <>
                  {hour.snowfall} mm 
                  <img className="snow-icon"
                  src={snowIcon}
                  alt="snow"
                                   
                  />
                  </>
                ): (
                  hour.snowfall
                )}</td>
                <td>{hour.snow_depth}</td>
                <td>{hour.wind_speed_10m}</td>
                <td>{hour.uv_index}</td>
                <td>{hour.is_day ? 'Day' : 'Night'}</td>
                  
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






