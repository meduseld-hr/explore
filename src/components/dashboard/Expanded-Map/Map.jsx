import React, {useState} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

const MAPS_SECRET = "AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA";

// const libraries = ["places"];

export default function App() {
  //setting libraries variable so that console doesn't give warning anymore, per stackOverflow
  const [libraries] = useState(['places']);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries,
  });
  const [markers, setMarkers] = useState([]);

  if(loadError) {
    return "Error loading maps";
  }
  if(!isLoaded) {
    return "Loading Maps";
  }

  const center = {
    lat: 30.27466235839214,
    lng: -97.74035019783334,
  }

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
  }

  return <div>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={mapOptions}
      onClick={(e) => {
        console.log(e);
        setMarkers(prev => [...prev,{
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
        }]);
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={marker.time.toISOString()}
          position={{lat: marker.lat, lng: marker.lng}}
        />
      ))}
    </GoogleMap>
  </div>;

}

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};