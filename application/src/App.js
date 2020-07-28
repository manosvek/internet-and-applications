import React from "react";

import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import Tabs from './components/Tabs';

const API_KEY = "9c8c814f6f94f1bb0ad930ceada1d790";

var data3;
var days = [1,2,3,4,5,6,7];

class App extends React.Component {
  state = {
    temperature1: undefined,
    city1: undefined,
    country1: undefined,
    humidity1: undefined,
    decription1: undefined,
    lat1: undefined,
    lon1: undefined,
    error1: undefined,
    temperature2: undefined,
    city2: undefined,
    country2: undefined,
    humidity2: undefined,
    decription2: undefined,
    lat2: undefined,
    lon2: undefined,
    forecast: [],
    error2: undefined
  }


  getWeather = async (e) => {
    e.preventDefault();
    var city1 = e.target.elements.city1.value;
    var country1 = e.target.elements.country1.value;
    var city2 = e.target.elements.city2.value;
    var country2 = e.target.elements.country2.value;

    var api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city1},${country1}&appid=${API_KEY}&units=metric`);
    var data1 = await api_call.json();

    api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city2},${country2}&appid=${API_KEY}&units=metric`);
    var data2 = await api_call.json();

    if (data2.coord) {
      api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data2.coord.lat}&lon=${data2.coord.lon}&
exclude=current,minutely,hourly&appid=${API_KEY}&units=metric`);
      data3 = await api_call.json();
    }

    if (city1 && country1 && data1.cod === 200) {
      this.setState({
        temperature1: data1.main.temp,
        city1: data1.name,
        country1: data1.sys.country,
        humidity1: data1.main.humidity,
        description1: data1.weather[0].description,
        lat1: data1.coord.lat,
        lon1: data1.coord.lon,
        error1: ""
      });
    } else {
      this.setState({
        temperature1: undefined,
        city1: "Error",
        country1: undefined,
        humidity1: undefined,
        description1: undefined,
        lat1: undefined,
        lon1: undefined,
        error1: "Please enter valid first city and country."
      });
    }

    if (city2 && country2 && data2.cod === 200) {
      // console.log(data2);

      this.setState({
        temperature2: data2.main.temp,
        city2: data2.name,
        country2: data2.sys.country,
        humidity2: data2.main.humidity,
        description2: data2.weather[0].description,
        lat2: data2.coord.lat,
        lon2: data2.coord.lon,
        forecast: data3.daily,
        error2: ""
      });
      console.log(this.state.forecast);
    } else {
      this.setState({
        temperature2: undefined,
        city2: "Error",
        country2: undefined,
        humidity2: undefined,
        description2: undefined,
        lat2: undefined,
        lon2: undefined,
        forecast: undefined,
        error2: "Please enter valid second city and country."
      });
    }
    console.log(this.state);
  }



  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  {this.state.city1 && <Tabs>
                    <div label={this.state.city1}>
                      <Weather
                        temperature={this.state.temperature1}
                        humidity={this.state.humidity1}
                        city={this.state.city1}
                        country={this.state.country1}
                        description={this.state.description1}
                        error={this.state.error1}
                      />
                    </div>
                    <div label={this.state.city2}>
                      <Weather
                        // temperature={this.state.temperature2}
                        temperature={data3.daily[2].temp.day}
                        humidity={this.state.humidity2}
                        city={this.state.city2}
                        country={this.state.country2}
                        description={this.state.description2}
                        error={this.state.error2}
                      />
                    </div>
                    <div label={"Forecast"}>
                      <Tabs>
                        {days.map(day => (
                          <div label={`Day ${day}`}>
                            <Weather
                              temperature={data3.daily[day].temp.day}
                              humidity={data3.daily[day].humidity}
                              city={this.state.city2}
                              country={this.state.country2}
                              description={data3.daily[day].weather[0].description}
                              error={this.state.error2}
                            />
                          </div>
                        ))}
                      </Tabs>

                    </div>
                  </Tabs>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
