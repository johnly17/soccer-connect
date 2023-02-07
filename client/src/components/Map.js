import React, { useEffect, useState } from "react";

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";


function Map({ events }) {
  const [locations, setLocations] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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

  console.log(events)

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="shadow-lg"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onClick={() => setActiveMarker(null)}
    >
      {events.map(event => {
        return (
        <Marker 
        position={ {lat: event.latitude, lng: event.longitude } }
        />
        )
      })}
    </GoogleMap>
  ) : null;
}

export default Map;
