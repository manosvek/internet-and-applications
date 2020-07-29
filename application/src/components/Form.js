import React from "react";

const Form = props => (
      <form onSubmit={props.getWeather}>
        <input type="text" name="city1" placeholder="First City..."/>
        <input type="text" name="country1" placeholder="First Country..."/>
        <input type="text" name="city2" placeholder="Second City..."/>
        <input type="text" name="country2" placeholder="Second Country..."/>
        <button>Get Weather & Route</button>
      </form>
    );

export default Form;
