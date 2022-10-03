import {useState, useMemo, useCallback, useRef} from 'react';
import {
  GoogleMap,
  MarkerF,
  DirectionsService,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places.jsx";
import Distance from "./Distance.jsx";
import styled from "styled-components";


export default function Map() {
//Google Maps Shortcuts
const LatLngLiteral = google.maps.LatLng.Literal;
const DirectionsResult = google.maps.DirectionsResult;
const MapOptions = google.maps.MapOptions;

const mapRef = useRef();
const options = useMemo(() => ({
  disableDefaultUI: false,
  clickableIcons: true,
}), []);
const onLoad = useCallback((map) => (mapRef.current = map), []);//memoizes map


const [center, setCenter] = useState({lat: 30.27466235839214, lng: -97.74035019783334});
const [markerArray, setMarkerArray] = useState([
  {coord: {lat: 30.27466235839214, lng: -97.74035019783334}, name: "Texas Capitol"},
  {coord: {lat: 30.258776290155463, lng: -97.89280590399123}, name: "Home"},
  {coord: {lat: 30.2665479871577, lng: -97.76877103015458}, name: "Zilker Park"},
]);

return (
  <Container>

      {/* <Distance>
      </Distance>
      <Places>
      </Places> */}

    <MapStyle>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {markerArray.map(marker => {
          return <MarkerF position={{lat: marker.coord.lat, lng: marker.coord.lng}}/>
        })}

      </GoogleMap>
    </MapStyle>

  </Container>

    )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const MapStyle = styled.div`
  width: 100%;
  height: 100%;
`;