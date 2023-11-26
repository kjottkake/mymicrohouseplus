import React, { useState } from 'react';
import DailyForecast from './DailyForecast';

const DailyWeatherSquare = ({ dailyData, location }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`daily-weather-square ${showDetails ? 'expanded' : ''}`} onClick={handleClick}>
      <h3>Daily Weather</h3>
      {showDetails && <DailyForecast dailyData={dailyData} location={location} />}
    </div>
  );
};

export default DailyWeatherSquare;

