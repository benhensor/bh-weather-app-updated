import { DateTime } from "luxon";
import dotenv from "dotenv";


dotenv.config();
// This code is a JavaScript module that exports a function called getFormattedWeatherData, 
// as well as two other functions, formatToLocalTime and iconUrlFromCode.

// api key and base url
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

// api call count
export let apiCallCount = localStorage.getItem("apiCallCount") || 0;

// get weather data from api call and return json data
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({...searchParams, appid: API_KEY});

  // increment api call count
  apiCallCount++;
  // save api call count to local storage
  localStorage.setItem("apiCallCount", apiCallCount);
  
  // return json data
  return fetch(url)
  .then((res) => res.json());
};


const formatWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat, 
    lon, 
    temp, 
    feels_like, 
    temp_min, 
    temp_max, 
    humidity, 
    name, 
    dt, 
    country, 
    sunrise, 
    sunset, 
    details, 
    icon, 
    speed
  };
};

const formatForecast = (data) => {
  let { timezone, daily, hourly } = data;

  daily = daily.slice(0, 7).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(0, 24).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "H a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat, lon, exclude: "current,minutely,alerts", units: searchParams.units,
  }).then(formatForecast);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | 'H:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };