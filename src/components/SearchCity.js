import React from "react";

function SearchCity({ city, onCityChange }) {
  return (
    <label>
      City:
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={onCityChange}
      />
    </label>
  );
}

export default SearchCity;
