import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";

export class Maps extends Component {
  state = {
    content: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    //
    markers: [{ lat: 41, lng: 87 }],
    icon: "images/gmaps30x39.png",
    center: {
      lat: 41.888573,
      lng: -87.63545
    },
    style: { width: "200px", height: "200px" },
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

  handleOnClick = (props, marker, e) => {
    console.log("onclick", props, marker, e);
  };
  onMarkerClick = (props, marker, e) => {
    // console.log(props);
    let { name, address, phone, image_url } = props;
    // console.log(name);
    this.setState({
      content: { name, address, phone, image_url },
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
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
    console.log(this.state.content);
    return (
      <div className="Maps">
        MAPEANDO
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          style={{ width: "550px", height: "600px", position: "relative" }}
          initialCenter={this.state.center}
          mapTypeId="roadmap"
          onClick={this.onMapClicked}
        >
          {this.state.markers.map(m => {
            return (
              <Marker
                key={m.id}
                icon={this.state.icon}
                name={m.name}
                position={{ lat: m.lat, lng: m.lng }}
                onClick={this.onMarkerClick}
              />
            );
          })}
          <InfoWindow
            visible={this.state.showingInfoWindow}
            marker={this.state.activeMarker}
          >
            <h4>{this.state.content.name}</h4>
            <h3>{this.state.content.address}</h3>
            {this.state.content.phone}
            {this.state.content.image_url}
          </InfoWindow>
        </Map>
      </div>
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
