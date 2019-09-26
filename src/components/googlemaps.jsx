import React, { Component } from "react";
import GoogleMap from "google-map-react";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GMaps extends Component {
  state = {
    markers: [{ lat: 41, lng: 87 }],
    center: {
      lat: 41.881832,
      lng: -87.623177
    },
    zoom: 10,

    URLkeys: {
      key: "AIzaSyCva5Jo75yN-2KpLkd3WAIKNKvMPz2LF2o", // use config file later - autopair key
      language: "en",
      region: "en"
    },

    mapTypeControl: false,
    mapTypeControlOptions: {
      //   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: ["roadmap", "terrain"]
    }
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
      <div>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMap
            mapType="ROADMAP"
            bootstrapURLKeys={this.state.URLkeys}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            mapTypeIds="roadmap"
            //optional, let's test it
            // yesIWantToUseGoogleMapApiInternals
            // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {this.state.markers.map(m => (
              <AnyReactComponent
                key={m.id}
                lat={m.lat}
                lng={m.lng}
                text={m.name}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default GMaps;
