import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('New York');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data using WeatherAPI
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    const apiKey = '6e1ecba173764c2e885163852252204';  // Replace with your WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLocation(e.target.value);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          onKeyDown={handleSearch}
          className="form-control w-50 mx-auto mb-4"
        />
      </div>

      {loading && <div className="text-center"><p>Loading...</p></div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {weatherData && !loading && !error && (
        <div className="card shadow-lg p-4">
          <div className="text-center">
            <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
            <p className="lead">{weatherData.current.condition.text}</p>
            <img src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} />
            <h3 className="mt-3">{weatherData.current.temp_c}°C</h3>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
