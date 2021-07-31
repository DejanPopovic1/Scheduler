import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import './styles.css';

export class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          title: "The marker`s title will appear as a tooltip.",
          name: "SOMA",
          position: { lat: 37.778519, lng: -122.40564 }
        }
      ]
    };
    this.onClick = this.onClick.bind(this);
  }



  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    debugger;

    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: "",
            position: { lat, lng }
          }
        ]
      };
    });
  }

    render() {
        return (
          <div>
          <h1 className="text-center">My Maps</h1>
          
          <Map
          
            google={this.props.google}
            style={{ width: "50%", margin: "auto"}}
            className={"mapAlign"}
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
        </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBmR1boQwfJds75LmvteHJ3SQ38rwc61IA"
})(MainMap);