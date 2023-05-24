import './App.css';
import getFormattedWeatherData from './components/WeatherData';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import Search from './components/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';

function App() {

  const [query, setQuery] = useState({ query: "London" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setQuery({ lat, lon });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      //const message = query.q ? query.q : 'current location.';

      await getFormattedWeatherData({ ...query, units}).then((data) => {
        setWeather(data);    
    });
  };
    fetchWeather();
  }, [query, units]);

  return (
    <main className="main">
      <section className="app-container">
        <Header weather={weather} />
        <Search
          setQuery={setQuery}
          units={units}
          setUnits={setUnits}
        />
        <div className="divide-top"></div>
        {weather && (
        <div>
          <CurrentWeather 
            weather={weather}
            units={units}
          />
          <div className="divide-bottom"></div>
          <Forecast 
            hourly={weather.hourly}
            daily={weather.daily} />
        </div>
        )}
        <div className="divide-top"></div>
        <Footer />
      </section>
    </main>
  );
}

export default App;
