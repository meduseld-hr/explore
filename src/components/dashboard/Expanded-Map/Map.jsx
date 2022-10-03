import React from 'react';
import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";

const MAPS_SECRET = "AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA";

const libraries = ["places"];

export default function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries,
  });

  if(loadError) {
    return "Error loading maps";
  }

  const center = {
    lat: 30.27466235839214,
    lng: -97.74035019783334,
  }

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: false,
  }


  return <div>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={mapOptions}
    >
    </GoogleMap>
  </div>;

}

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};