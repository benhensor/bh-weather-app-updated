import React, { useEffect, useState }  from 'react';
import * as d3 from 'd3';
import loadImage from '../Images';
import { formatToLocalTime, iconUrlFromCode } from "./WeatherData";

function CurrentWeather({ units, weather: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, dt, timezone, name, country }}) {

  const celsiusRange = [-10, 0, 10, 20, 30, 40, 50];
  const fahrenheitRange = [-50, 32, 50, 68, 86, 104, 122];

  // const handleBgColChange = (temp) => {
  //   let colorRange;
  //   if (units === "metric") {
  //     colorRange = d3.scaleLinear()
  //       .domain(celsiusRange)
  //       .range(["#e4f5ff", "#98f3ff", "#00dffd", "#00d0aa", "#ffd500", "#f25a14", "#b00000"])
  //   } else {
  //     colorRange = d3.scaleLinear()
  //       .domain(fahrenheitRange)
  //       .range(["#e4f5ff", "#98f3ff", "#00dffd", "#00d0aa", "#ffd500", "#f25a14", "#b00000"])
  //   }
  //   return colorRange(temp);
  // }

  const [bgColor, setBgColor] = useState("#e4f5ff");

  useEffect(() => {
    const colorRange = units === "metric"
      ? d3.scaleLinear().domain(celsiusRange).range(["#e4f5ff", "#98f3ff", "#00dffd", "#00d0aa", "#ffd500", "#f25a14", "#b00000"])
      : d3.scaleLinear().domain(fahrenheitRange).range(["#e4f5ff", "#98f3ff", "#00dffd", "#00d0aa", "#ffd500", "#f25a14", "#b00000"]);
    setBgColor(colorRange(temp));
  });

  return (
    <section className="current-weather-container">
      <div className="current-location">
        <p>
          {`${name}, ${country}`}
        </p>
      </div>
      <div className="current-conditions">
      <div className="current-conditions-details">
      <p style={{ color: bgColor }}>{details}</p>
      </div>
      <div className="current-weather-icon-container">
        <img src={iconUrlFromCode(icon)} alt="" className="current-weather-icon" />
      </div>
      </div>
      <div className="current-conditions-container" style={{ backgroundColor: bgColor }}>
        <p className="current-temp">{`${temp.toFixed()}°`}</p>
      </div>

      <div className="current-weather-details-a">
        <div className="current-block">
          <img className="current-icon" src={loadImage('thermometer.png')} alt="thermometer"/>
          <p>Real feel:<span className="current-value">{`${feels_like.toFixed()}°`}</span></p>  
        </div>
        <div className="current-block">
          <img className="current-icon" src={loadImage('tear.png')} alt="tear"/>
          <p>Humidity:<span className="current-value">{`${humidity.toFixed()}%`}</span></p>
        </div>
        <div className="current-block">
          <img className="current-icon" src={loadImage('wind.png')} alt="wind"/>
          <p>Wind:<span className="current-value">{`${speed.toFixed()} km/h`}</span></p>
        </div>
      </div>

      <div className="current-weather-details-b">
        <div className="current-block-a">
          <div className="current-block">
            <img className="current-icon" src={loadImage('sun.png')} alt="sunrise"/>
            <p>
              Sunrise:{" "}
              <span className="current-value">
                {formatToLocalTime(sunrise, timezone, "HH:mm a")}
              </span>
            </p>
          </div>
          <div className="current-block">
            <img className="current-icon" src={loadImage('sunset.png')} alt="sunset"/>
            <p>Sunset:{" "}
              <span className="current-value">
                {formatToLocalTime(sunset, timezone, "HH:mm a")}
              </span>
            </p>
          </div>
        </div>
        <div className="current-block-b">
          <div className="current-block">
            <img className="current-icon" src={loadImage('up-arrow.png')} alt="highs"/>
            <p>
              High:{" "}
              <span className="current-value">{`${temp_max.toFixed()}°`}</span>
            </p>
          </div>
          <div className="current-block">
            <img className="current-icon" src={loadImage('down-arrow.png')} alt="lows"/>
            <p>
              Low:{" "}
              <span className="current-value">{`${temp_min.toFixed()}°`}</span>
            </p>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default CurrentWeather;