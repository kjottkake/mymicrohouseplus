import React, { useState } from 'react';
import HourlyForecast from './HourlyForecast';

const HourlyWeatherToggle = ({ hourlyData, location }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`hourly-weather-square ${showDetails ? 'expanded' : ''}`} onClick={handleClick}>
      <h3>To show hourly weather, please click here</h3>
      {showDetails && <HourlyForecast hourlyData={hourlyData} location={location} />}
    </div>
  );
};

export default HourlyWeatherToggle;