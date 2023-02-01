import React, { useEffect, useState } from "react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


function Map({ events }) {
  const [locations, setLocations] = useState([]);

  const containerStyle = {
    margin: "30px auto 0 auto",
    width: "600px",
    height: "400px",
    borderRadius: "10px",
  };

  const center = {
    lat: 39.1415,
    lng: -98.883,
  };

  const position = {
    lat: 39.1415,
    lng: -98.883,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA41zVVH2Adcnb2HnLwVxwuAl5-HF1GlEE",
  });

  const arrOfAddress = events.map((event) => {
    return (
      event.address + " " + event.city + " " + event.state + " " + event.zipcode
    );
  });

  //   useEffect(() => {
  //     arrOfAddress.forEach((address) => {
  //     const response = await fetch(
  //        https://api.apininja.com/v1/geocode/address?address=${address}`
  //      );
  //      const data = await response.json();
  //      const { lat, lng } = data.data.location;
  //      setLocations((prevLocations) => [...prevLocations, { lat, lng }]);
  //     });
  //   }, [arrOfAddress]);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="shadow-lg"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
    >
      {/* {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
        />
      ))} */}
    </GoogleMap>
  ) : null;
}

export default Map;
