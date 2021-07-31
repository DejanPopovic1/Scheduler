import React, { Component, Fragment } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import './styles.css';

export class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // markers: [
      //   {
      //     title: "The marker`s title will appear as a tooltip.",
      //     name: "SOMA",
      //     position: { lat: 37.778519, lng: -122.40564 }
      //   }
      // ]
      markers: []
    };
    this.onClick = this.onClick.bind(this);
  }



  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    debugger;

    const containerStyle = {
      position: 'absolute',  
      width: '100%',
      height: '50%'
    }

    //The three dots mean spread syntax. See spread syntax here: https://stackoverflow.com/questions/31048953/what-does-the-three-dots-notation-do-in-javascript/42486285#42486285
    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
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
      // const persons = [
      //   {firstname : "Malcom", lastname: "Reynolds"},
      //   {firstname : "Kaylee", lastname: "Frye"},
      //   {firstname : "Jayne", lastname: "Cobb"}
      // ];
      // var test = persons.map(getFullName);
      // The following is added in the return section {test}

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
    apiKey: "AIzaSyBmR1boQwfJds75LmvteHJ3SQ38rwc61IA"
})(MainMap);

// function getFullName(item) {
//   return [item.firstname,item.lastname].join(" ");
//   }