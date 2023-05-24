import React, { useState } from 'react';
import loadImage from '../Images';

function Search({ setQuery, units, setUnits }) {

  const [city, setCity] = useState('');

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
    setCity('');
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
    
      navigator.geolocation.getCurrentPosition((position) => {
  
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };

  return (
    <section className="search-container">
      <div className="search-input-container">
        <input
          className="search-input"
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search" 
          onKeyDown={(e) => {e.key === "Enter" && handleSearchClick()}}
        />
      </div>
      <div className="search-location-icons-container">
          <img
          className="search-icon"
          onClick={handleSearchClick}
          src={loadImage('search.png')} 
          alt="search"
          />
          <img
          className="location-icon"
          onClick={handleLocationClick}
          src={loadImage('location.png')} 
          alt="location"
          />
        </div>

      <div className="temp-unit-icon-container">
        <button 
        name="metric" 
        className="unit-metric"
        onClick={handleUnitsChange}
        >C</button>
        <p className='unit-divider'>|</p>
        <button 
        name="imperial" 
        className="unit-imperial"
        onClick={handleUnitsChange}
        >F</button>
      </div>
    </section>
  )
}

export default Search;