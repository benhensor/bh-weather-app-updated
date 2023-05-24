import React from 'react';
import { formatToLocalTime } from './WeatherData';

const Header = ({ weather }) => {

  if (!weather) {
    return null; // Return null if weather prop is not available
  }


  return (
    <header>
      <div className="header-date-time">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(weather.dt, weather.timezone)}
        </p>
      </div>
    </header>
  )
}

export default Header;