import React, { useState } from 'react';
import Hourly from './HourlyForecast';
import Daily from './DailyForecast';

const Forecast = ({ hourly, daily }) => {

  const [forecast, setForecast] = useState("hourly");

  const handleForecastChange = (e) => {
    setForecast(e.target.value);
  };

  const forecastSelector = forecast === 'hourly';


  return (
    <section className="forecast-container">
      <div className="forecast-selector">
        <button
          className={`forecast-selector-button ${forecastSelector ? 'selected' : ''}`}
          value="hourly"
          onClick={handleForecastChange}
          disabled={forecastSelector}
        >
          Hourly
        </button>
        <button
          className={`forecast-selector-button ${!forecastSelector ? 'selected' : ''}`}
          value="daily"
          onClick={handleForecastChange}
          disabled={!forecastSelector}
        >
          Daily
        </button>
      </div>
      <div className="forecast-display-container">
      {forecastSelector ? (
        <Hourly hourly={hourly} />
      ) : (
        <Daily daily={daily} />
      )}
      </div>
    </section>
  )
}

export default Forecast;