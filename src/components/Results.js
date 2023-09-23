import React from "react";

function Results({ weather }) {
  if (!weather) return null;
  return (
    <div>
      <h2>{weather.location.name}</h2>
      <p>Max temperature: {weather.forecast.forecastday[0].day.maxtemp_c}°C</p>
      <p>Min temp: {weather.forecast.forecastday[0].day.mintemp_c}°C</p>
      <p>Condition: {weather.forecast.forecastday[0].day.condition.text}</p>
    </div>
  );
}

export default Results;
