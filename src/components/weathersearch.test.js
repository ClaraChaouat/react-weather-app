// import React from "react";
// import { render, fireEvent, screen, waitFor } from "@testing-library/react";
// import WeatherSearch from "./WeatherSearch";

// describe("WeatherSearch", () => {
//   beforeEach(() => {
//     global.fetch = jest.fn(
//       () =>
//         new Promise((resolve) => {
//           // Keeps the promise pending
//         })
//     );
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it("renders the WeatherSearch form inputs", () => {
//     render(<WeatherSearch />);
//     const cityInput = screen.getByLabelText("City:");
//     const dateInput = screen.getByLabelText("Date:");
//     const languageInput = screen.getByLabelText("Language:");
//     expect(cityInput).toBeInTheDocument();
//     expect(dateInput).toBeInTheDocument();
//     expect(languageInput).toBeInTheDocument();
//   });
// });

import { render, screen, fireEvent } from "@testing-library/react";
import WeatherSearch from "../WeatherSearch";

describe("WeatherSearch", () => {
  it("renders the form inputs", () => {
    render(<WeatherSearch />);

    const cityInput = screen.getByLabelText(/city:/i);
    const dateInput = screen.getByLabelText(/date:/i);
    const languageInput = screen.getByLabelText(/language:/i);

    expect(cityInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(languageInput).toBeInTheDocument();
  });

  it("displays the weather data when the form is submitted", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "London",
            weather: [{ description: "sunny" }],
            main: { temp: 20 },
          }),
      })
    );

    render(<WeatherSearch />);
    const cityInput = screen.getByLabelText("City:");
    const dateInput = screen.getByLabelText("Date:");
    const languageInput = screen.getByLabelText("Language:");
    const submitButton = screen.getByText("Search");

    fireEvent.change(cityInput, { target: { value: "London" } });
    fireEvent.change(dateInput, { target: { value: "2022-01-01" } });
    fireEvent.change(languageInput, { target: { value: "en" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("London")).toBeInTheDocument();
    expect(screen.getByText("sunny")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
