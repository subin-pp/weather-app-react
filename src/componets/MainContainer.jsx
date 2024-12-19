import React, { useState } from 'react';
import inputValue from './InputBox'

const WeatherApp = ({ inputValue }) => {
  const [city, setCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
      
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&APPID=6557810176c36fac5f0db536711a6c52`);
        console.log(inputValue);
        

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Set data for current weather and forecast
      setCity(data.city);
      setCurrentWeather(data.list[0]); // Assuming the first item is the current weather
      const daily = data.list.filter((item, index) => index % 8 === 0); // Filter for daily forecasts
      setDailyForecast(daily.slice(0, -1)); // Remove the last forecast item
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Trigger the function when Enter key is pressed outside this component
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
    }
  };



  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, #74ebd5, #9face6)',
        color: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px',
      }}
    >
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {!loading && !error && city && (
        <>
          {/* Current Weather */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                width: '300px',
                padding: '15px',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.2)',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                textAlign: 'center',
              }}
            >
              <h2 style={{ marginBottom: '10px' }}>{city?.name}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`}
                alt={currentWeather?.weather[0]?.description}
                style={{ width: '80px', height: '80px' }}
              />
              <p style={{ margin: '10px 0', textTransform: 'capitalize' }}>
                {currentWeather?.weather[0]?.description}
              </p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {currentWeather?.main.temp}°C
              </h3>
            </div>
          </div>

          {/* 4-Day Forecast */}
          <div
            className="weather-forecast"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {dailyForecast.map((item, index) => (
              <div
                key={index}
                className="forecast-item"
                style={{
                  width: '160px',
                  height: '230px',
                  padding: '15px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                  textAlign: 'center',
                  color: '#fff',
                }}
              >
                <h6 style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                  {new Date(item.dt_txt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h6>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  style={{ width: '80px', height: '80px' }}
                />
                <p style={{ margin: '10px 0', textTransform: 'capitalize' }}>
                  {item.weather[0].description}
                </p>
                <h6 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {item.main.temp}°C
                </h6>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
