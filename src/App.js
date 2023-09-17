import "./App.css";
import WeatherSearch from "./components/WeatherSearch";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <main className="main">
          <header className="App-header">
            <p>MY REACT APP</p>
          </header>
          <WeatherSearch />
        </main>
      </div>
    </div>
  );
}

export default App;
