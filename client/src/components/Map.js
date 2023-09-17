import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

function Map({ events }) {
  const [search, setSearch] = useState("");
  const [selectedMarker, setSelectedMarker] = useState("");
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [center, setCenter] = useState({lat: 39.1415, lng: -98.883})
  const [zoom, setZoom] = useState(4);

  const containerStyle = {
    margin: "30px auto 0 auto",
    width: "800px",
    height: "500px",
    borderRadius: "10px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const markerRef = useRef();

// for search input
  const onSearchInput = async (event) => {
    setSearch(event.target.value);
    const input = event.target.value;
    const geocoder = new window.google.maps.Geocoder();

    await geocoder.geocode({ address: input }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
        setZoom(10);
      }
    });
  };


  return isLoaded ? (
    <div>
      <h5 className="text-center" style={{ marginBottom: "-10px" }}>
        Search for events by a city near you!
      </h5>
      <Form style={{ width: "30%", margin: "0 auto", marginTop: "20px" }}>
        <Form.Control placeholder="search for an event..." className="shadow" value={search} onChange={onSearchInput}/>
      </Form>
      <GoogleMap
        mapContainerClassName="shadow-lg"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {events.map((event) => {
          return (
            <Marker
              ref={markerRef}
              key={event.title}
              position={{ lat: event.latitude, lng: event.longitude }}
              onClick={() => {
                setSelectedEvent(event);
                setSelectedMarker({
                  lat: event.latitude,
                  lng: event.longitude,
                });
              }}
            />
          );
        })}
        {selectedMarker && selectedEvent && (
          <InfoWindow
            anchor={markerRef.current}
            position={selectedMarker}
            onCloseClick={() => {
              setSelectedMarker(null);
              setSelectedEvent(null);
            }}
          >
            <div>
              <h1>{selectedEvent.name}</h1>
              <p>{selectedEvent.description}</p>
              <p>
                <strong>When:</strong> {selectedEvent.date}{" "}
                <strong>Time:</strong> {selectedEvent.time}
              </p>
              <p></p>
              <p>
                <strong>Where:</strong>{" "}
                <a
                  href={`https://google.com/maps/?q=${
                    selectedEvent.address +
                    " " +
                    selectedEvent.city +
                    " " +
                    selectedEvent.state
                  }`}
                >
                  {selectedEvent.address}, {selectedEvent.city},{" "}
                  {selectedEvent.state} {selectedEvent.zipcode}
                </a>
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : null;
}

export default Map;
