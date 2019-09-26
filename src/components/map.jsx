import React, { Component } from "react";
import axios from "axios";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";

export class Maps extends Component {
  state = {
    markers: [{ lat: 41, lng: 87 }],
    center: {
      lat: 41.888573,
      lng: -87.63545
    },
    style: { width: "50%", height: "50%" },
    zoom: 10,
    // URLkeys: {
    key: "AIzaSyCva5Jo75yN-2KpLkd3WAIKNKvMPz2LF2o", // use config file later - autopair key
    language: "en"
    //   region: "en"
    // }
    // mapTypeControl: false,
    // mapTypeControlOptions: {
    //   //   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    //   mapTypeIds: ["roadmap", "terrain"]
    // }
  };

  async componentDidMount() {
    const { data: markers } = await axios.get(
      "http://localhost:3001/api/merchants?pageNumber=0"
    );
    console.log(markers);
    this.setState({ markers });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        style={this.state.styles}
        initialCenter={this.state.center}
      >
        {this.state.markers.map(m => {
          return (
            <Marker
              title={m.name}
              name="SOMA"
              position={{ lat: m.lat, lng: m.lng }}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper(
  {
    apiKey: "AIzaSyCva5Jo75yN-2KpLkd3WAIKNKvMPz2LF2o"
  }
  // props => {
  //     apiKey: props.apiKey,
  //     language: props.language
  // }
)(Maps);
