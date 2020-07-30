import React from "react";
// import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import hash from 'object-hash';

import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import Tabs from "./components/Tabs"
import Route from "./components/Route"


const API_KEY1 = "9c8c814f6f94f1bb0ad930ceada1d790";
const API_KEY2 = "5b3ce3597851110001cf62485fb1355fbbe9493d9ef5a0b59535dcfd"

var data3, route;
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
    error2: undefined
  }


  getWeather = async (e) => {
    e.preventDefault();
    var city1 = e.target.elements.city1.value;
    var country1 = e.target.elements.country1.value;
    var city2 = e.target.elements.city2.value;
    var country2 = e.target.elements.country2.value;

    var api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city1},${country1}&appid=${API_KEY1}&units=metric`);
    var data1 = await api_call.json();

    api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city2},${country2}&appid=${API_KEY1}&units=metric`);
    var data2 = await api_call.json();

    if (data2.coord) {
      api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data2.coord.lat}&lon=${data2.coord.lon}&
exclude=current,minutely,hourly&appid=${API_KEY1}&units=metric`);
      data3 = await api_call.json();
    }

    if (data1.coord && data2.coord) {
      api_call = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY2}&start=${data1.coord.lon},${data1.coord.lat}&end=${data2.coord.lon},${data2.coord.lat}`);
      route = await api_call.json();
      console.log(route);
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
      this.setState({
        temperature2: data2.main.temp,
        city2: data2.name,
        country2: data2.sys.country,
        humidity2: data2.main.humidity,
        description2: data2.weather[0].description,
        lat2: data2.coord.lat,
        lon2: data2.coord.lon,
        error2: ""
      });
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
    const position1 = [this.state.lat1, this.state.lon1];
    const position2 = [this.state.lat2, this.state.lon2];

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
                  {(this.state.city1 || this.state.city2) && <Tabs>
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
                        temperature={this.state.temperature2}
                        humidity={this.state.humidity2}
                        city={this.state.city2}
                        country={this.state.country2}
                        description={this.state.description2}
                        error={this.state.error2}
                      />
                    </div>
                    <div label="Forecast">
                      <Tabs>
                        {days.map(day => (
                          <div label={`Day ${day}`}>
                            {(data3 && <Weather
                              temperature={data3.daily[day].temp.day}
                              humidity={data3.daily[day].humidity}
                              city={this.state.city2}
                              country={this.state.country2}
                              description={data3.daily[day].weather[0].description}
                              error={this.state.error2}
                            />)
                            || <Weather
                              temperature={undefined}
                              humidity={undefined}
                              city={this.state.city2}
                              country={this.state.country2}
                              description={undefined}
                              error={this.state.error2}
                            />
                            }
                          </div>
                        ))}
                      </Tabs>
                    </div>
                    <div label = "Route">
                      <Route
                        city1 = {this.state.city1}
                        city2 = {this.state.city2}
                        route = {route}
                        position1 = {position1}
                        position2 = {position2}
                      />
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
