import React, { useState } from "react";
import "./weather-search.scss";

function WeatherSearch() {
  const [city, setCity] = useState(""); // Add new state variable for city
  const [language, setLanguage] = useState(""); // Add new state variable for language
  const [date, setDate] = useState(""); // Add new state variable for date
  const [weatherData, setWeatherData] = useState(null); // Add new state variable for weather data
  const apiKey = process.env.REACT_APP_API_KEY;

  function handleCityChange(event) {
    setCity(event.target.value); // Update city state with selected city
  }

  function handleDateChange(event) {
    setDate(event.target.value); // Update date state with selected date
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value); // Update language state with selected language
  }

  function handleClick(event) {
    fetch(
      `http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${city}&dt=${date}&lang=${language}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }

        return response.json();
      })

      .then((data) => {
        setWeatherData(data); // Update weather data state with API response
        console.log(data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error here, such as showing an error message to the user
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange} // Add onChange event handler to update the city state
      />

      <input
        placeholder="Date yyyy/MM/dd"
        value={date}
        onChange={handleDateChange} // Add onChange event handler to update the date state
      />

      <input
        placeholder="Language"
        value={language}
        onChange={handleLanguageChange} // Add onChange event handler to update the language state
      />
      <button onClick={handleClick}>Search</button>

      {weatherData && ( // Render weather data if it exists
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>
            Max temperature: {weatherData.forecast.forecastday[0].day.maxtemp_c}
            °C
          </p>
          <p>Min temp: {weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>

          <p>
            Condition: {weatherData.forecast.forecastday[0].day.condition.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherSearch;
