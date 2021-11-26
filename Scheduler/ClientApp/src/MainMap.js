import React, { Component, Fragment } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import './styles.css';
import { APIKey_GoogleMaps } from './SecurityKeys';

export class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.props.sendData(lat, lng);

    const containerStyle = {
      position: 'absolute',  
      width: '100%',
      height: '50%'
    }

    this.setState(previousState => {
      return {
        markers: [
          //If we wanted to keep previous markers, we would keep the line below
          //...previousState.markers,
          {
            title: "Pickup Point",
            name: "Pickup Point",
            position: { lat, lng }
          }
        ]
      };
    });
  }

    render() {
        return (
          <Map
            google={this.props.google}
            containerStyle={this.containerStyle}
            className={"map"}
            zoom={14}
            onClick={this.onClick}
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                title={marker.title}
                name={marker.name}
                position={marker.position}
              />
            ))}
          </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: APIKey_GoogleMaps
})(MainMap);