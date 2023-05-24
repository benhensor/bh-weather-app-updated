import React from 'react';
import { apiCallCount } from './WeatherData';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>API calls: {apiCallCount}</p>
      <p className="separator">|</p>
      <p>Copyright &copy; {currentYear}</p>
    </footer>
  )
}

export default Footer;