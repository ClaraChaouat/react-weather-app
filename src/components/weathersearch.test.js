import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import WeatherSearch from "./WeatherSearch";

describe("WeatherSearch", () => {
  it("renders the WeatherSearch form inputs", () => {
    render(<WeatherSearch />);
    const cityInput = screen.getByLabelText("City:");
    const dateInput = screen.getByLabelText("Date:");
    const languageInput = screen.getByLabelText("Language:");
    expect(cityInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(languageInput).toBeInTheDocument();
  });

  it("displays the loading state when fetching weather data", async () => {
    render(<WeatherSearch />);
    const submitButton = screen.getByText("Search");
    fireEvent.click(submitButton);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });
});
