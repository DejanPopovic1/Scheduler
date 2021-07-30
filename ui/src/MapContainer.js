import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

    state = {
        selectedPlace: ''
    }

    onMarkerClick = (e) => {
        this.setState({selectedPlace: e.Name});
    }

  render() {
    return (
      <Map 
        //google={this.props.google}
        style={{width: '20vw', height: '45vh', 'top': '1.5rem'}}
        containerStyle={{width: '20vw', height: '30vh'}}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lng
        }}
        zoom={15}>


        {this.props.markers && // Rendering single marker for supplier details map
          <Marker onClick={this.onMarkerClick}
                name={this.state.selectedPlace} />
        }

        <InfoWindow onClose={this.onInfoWindowClose}>
              <h4>{this.state.selectedPlace}</h4>
        </InfoWindow>
      </Map>
    );
  }
}
  
export default GoogleApiWrapper({
  apiKey: "AIzaSyBmR1boQwfJds75LmvteHJ3SQ38rwc61IA",
  language: "RU"
})(MapContainer)