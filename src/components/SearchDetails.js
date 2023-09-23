import React from "react";

function SearchDetails({ date, onDateChange, language, onLanguageChange }) {
  return (
    <>
      <label>
        Date:
        <input
          type="date"
          placeholder="Date yyyy/MM/dd"
          value={date}
          onChange={onDateChange}
        />
      </label>
      <label>
        Language:
        <input
          placeholder="Language"
          value={language}
          onChange={onLanguageChange}
        />
      </label>
    </>
  );
}

export default SearchDetails;
