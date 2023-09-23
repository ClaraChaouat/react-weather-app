import React, { useState } from "react";
import "./weather-search.scss";

const apiKey = process.env.REACT_APP_API_KEY;

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

function WeatherSearch() {
  const [city, setCity] = useState(""); // Add new state variable for city
  const [language, setLanguage] = useState(""); // Add new state variable for language
  const [date, setDate] = useState(""); // Add new state variable for date
  const [weatherData, setWeatherData] = useState(null); // Add new state variable for weather data
  const [loading, setLoading] = useState(false); // Add loading state

  function handleCityChange(event) {
    setCity(event.target.value); // Update city state with selected city
  }

  function handleDateChange(event) {
    setDate(event.target.value); // Update date state with selected date
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value); // Update language state with selected language
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true); // Set loading to true when making the API request

      // Simulate a delay of 3 seconds before making the API request
      await stall(3000);

      const response = await fetch(
        `http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${city}&dt=${date}&lang=${language}`
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }

      const data = await response.json();
      setWeatherData(data); // Update weather data state with API response
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleCityChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            placeholder="Date yyyy/MM/dd"
            value={date}
            onChange={handleDateChange}
          />
        </label>
        <label>
          Language:
          <input
            placeholder="Language"
            value={language}
            onChange={handleLanguageChange}
          />
        </label>
        <button type="submit">Search</button>
        {loading && <p>Loading...</p>}

        {weatherData && ( // Render weather data if it exists
          <div>
            <h2>{weatherData.location.name}</h2>
            <p>
              Max temperature:{" "}
              {weatherData.forecast.forecastday[0].day.maxtemp_c}
              °C
            </p>
            <p>
              Min temp: {weatherData.forecast.forecastday[0].day.mintemp_c}°C
            </p>

            <p>
              Condition:{" "}
              {weatherData.forecast.forecastday[0].day.condition.text}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default WeatherSearch;
