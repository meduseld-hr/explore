import React from "react";
import styled from "styled-components";
import PostTrip from "./Post-Trip/PostTrip.jsx";
import Chat from './Chat.jsx';
import { useContext } from "react";
// import { UserContext } from "../contexts/user";
import { useLoadScript, GoogleMap, LoadScript} from '@react-google-maps/api';
import Map from './Expanded-Map/Map.jsx';
const MAPS_SECRET = "AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA";

export default function StagingArea() {
  // const user = useContext(UserContext);
  // Loads the map using API KEY
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries: ["places"],
  })

  //returns Loading placeholder while map is being loaded
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <StagingAreaContainer>
      <PostTrip />
      <Chat />
      {/* <Map /> */}
    </StagingAreaContainer>
  );
}

const StagingAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0.5em;
  background-color: #9e9e9e;
`;