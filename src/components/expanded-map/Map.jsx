import {useState, useMemo, useCallback, useRef} from 'react';
import {
  GoogleMap,
  MarkerF,
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
const [center, setCenter] = useState({lat: 30.27466235839214, lng: -97.74035019783334});
const options = useMemo(() => ({
  disableDefaultUI: false,
  clickableIcons: true,
}), []);
// const onLoad = useCallback((map) => (mapRef.current = map), []);//memoizes map

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
        // onLoad={onLoad}
      >
        <MarkerF position={center} z-index={100} onLoad={() => {console.log("HELLO THERE")}}/>
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