import React from 'react';
import { iconUrlFromCode } from "./WeatherData";

const DailyForecast = ({ daily }) => {
  return (
    <section className="daily-forecast-container">
      <div className="daily-forecast-item-container">
        {daily.map((item, index) => (
          <div className="forecast-item" key={index}>
            <p className="forecast-item-title">{item.title}</p>
            <img className="forecast-item-icon" src={iconUrlFromCode(item.icon)} alt=""/>
            <p className="forecast-item-temp">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DailyForecast;