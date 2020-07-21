import React, { Component } from "react";
import { getWeatherData } from "../services/currentWeather";
import sunny from "../images/sunny2.png";
import sri from "../images/sri1.jpg";

class WeatherForecast extends Component {
  state = {
    weatherInfo: null,
    days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  };

  componentDidMount() {
    const { list: weatherInfo } = getWeatherData();
    this.setState({ weatherInfo });
  }

  getDay(date_text) {
    date_text = date_text.replace(" ", "-");
    let entries = date_text.split("-");
    let date = new Date(entries[0], parseInt(entries[1]) - 1, entries[2]);

    return this.state.days[date.getDay()];
  }

  render() {
    let dates = this.state.weatherInfo;

    return (
      <div className="flex-container">
        {dates &&
          dates.map(day => (
            <div className="card" key={day.dt_txt} style={{ margin: "10px" }}>
              <img className="card-img-top" src={sunny} alt="Card cap" />
              <div className="card-body">
                <h2 className="card-title">Weather Data</h2>
                <br />
                Date : {day.dt_txt},Day:{this.getDay(day.dt_txt)}
                <p className="card-text">
                  Min Temp : {day.main.temp_min}C,Max Temp :{day.main.temp_max}C
                </p>
                <p className="card-text"></p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default WeatherForecast;
