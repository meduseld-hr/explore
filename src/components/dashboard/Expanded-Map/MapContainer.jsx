import React from "react";
import styled from "styled-components";
import { useContext } from "react";
// import { UserContext } from "../contexts/user";
import { useLoadScript, GoogleMap, LoadScript} from '@react-google-maps/api';
import Map from './Map.jsx';

const MAPS_SECRET = "AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA";

export default function MapContainer() {

  // Loads the map using API KEY
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries: ["places"],
  })

  return (
    <GoogleMapContainer>
      <Map/>
    </GoogleMapContainer>
  );
}

const GoogleMapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0.5em;
  background-color: #9e9e9e;
`;


