import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  //   merchants = () => {
  //     return (
  //       <Marker
  //         position={{ lat: 37.778519, lng: -122.40564 }}
  //         onClick={this.onMarkerClick}
  //         name={"Current location"}
  //       />
  //         <InfoWindow
  //           marker={this.state.activeMarker}
  //           visible={this.state.showingInfoWindow}
  //           onOpen={e => {
  //             this.onInfoWindowOpen(this.props, e);
  //           }}
  //         >
  //           <div id="iwc" />
  //         </InfoWindow>
  //     );
  //   };

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowOpen(props, e) {
    const button = (
      <button
        onClick={e => {
          console.log("hmapbuttoni1");
        }}
      >
        mapbutton
      </button>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("iwc")
    );
  }

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }
    //height: "calc(100vh - 20px)"
    return (
      <div>
        <div
          style={{
            position: "relative",
            height: "300px"
          }}
        >
          <Map
            style={{}}
            initialCenter={{ lat: 41.888573, lng: -87.63545 }}
            google={this.props.google}
            zoom={10}
          >
            {/* {this.merchants} */}
          </Map>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCva5Jo75yN-2KpLkd3WAIKNKvMPz2LF2o"
  //   v: "3.30"
})(MapContainer);
