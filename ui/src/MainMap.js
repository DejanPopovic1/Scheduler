import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MainMap extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">My Maps</h1>
            <Map google={this.props.google}
                 style={{width: '80%', margin: 'auto'}}
                 className={'map'}
                 zoom={14}>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}} />
                <Marker
                    name={'Dolores park'}
                    position={{lat: 37.759703, lng: -122.428093}} />
                <Marker />
                <Marker
                    name={'Your position'}
                    position={{lat: 46.475640, lng: 30.759497}}/>
            </Map>
            </div>
        );
    }
}



export default GoogleApiWrapper({
    apiKey: "AIzaSyBmR1boQwfJds75LmvteHJ3SQ38rwc61IA"
})(MainMap);