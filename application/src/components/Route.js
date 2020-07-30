import React from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import hash from 'object-hash';


const convertHMS = function(value)  {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours   = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  return hours+':'+minutes;//+':'+seconds; // Return is HH : MM : SS
}


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const Route = props => (
  <div>
    {props.position1 && props.position2 && props.route.features && <div id="mapid">
      <Map center={props.position1} zoom="8">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={props.position1}>
          <Popup>
            {props.city1}, {props.country1}
          </Popup>
        </Marker>
        <Marker position={props.position2}>
          <Popup>
            {props.city2}, {props.country2}
          </Popup>
        </Marker>
        <GeoJSON key={hash(props.route)} data={props.route}>
          <Popup>
            Distance: {(props.route.features[0].properties.summary.distance / 1000).toFixed(3)} (km). <br /> Duration: {convertHMS(props.route.features[0].properties.summary.duration)} (hh:mm).
          </Popup>
        </GeoJSON>
      </Map>
    </div>
    }
    {props.position1 && props.position2 && !props.route.features && <p className="weather__error">
      There is no route between the two cities
      </p>
    }
  </div>
);

export default Route;
