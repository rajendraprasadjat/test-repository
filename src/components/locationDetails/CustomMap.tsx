import * as React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Mapicon from "../../images/map1.svg";
import { silverMapStyle } from "../../config/globalConfig";
const containerStyle = {
  width: "100%",
  height: "100%",
};

type props = {
  prop: any;
};

function CustomMap(coords: props) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: coords?.prop?.latitude, lng: coords?.prop?.longitude }}
        zoom={14}
        options={{
          styles: silverMapStyle,
        }}
      >
        <Marker
          position={{ lat: coords?.prop?.latitude, lng: coords?.prop?.longitude }}
          icon={Mapicon}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default CustomMap;
