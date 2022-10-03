import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { useLoadScript, GoogleMap, LoadScript} from '@react-google-maps/api';
import Map from '../components/expanded-map/Map.jsx';
const MAPS_SECRET = "AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA";
import styled from "styled-components";



export default function Dashboard () {
  const user = useContext(UserContext);
  // Loads the map using API KEY
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries: ["places"],
  })

  // This returns while map is being loaded
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <DashboardContainer>
      {/* Dashboard is here for {user && user.name} */}
      <Map/>
    </DashboardContainer>
  )
}

  const DashboardContainer = styled.div`
    height: 100%;
    width: 100%;
  `;
