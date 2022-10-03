import {useState, useMemo, useCallback, useRef} from 'react';
import {
  GoogleMap,
  MarkerF,
  Polygon,
  DirectionsService,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  StandaloneSearchBox,
  InfoWindow,
  Autocomplete
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
  // {coord: {lat: 30.2665479871577, lng: -97.76877103015458}, name: "Zilker Park"},
]);
const [directionsResponse, setDirectionsResponse] = useState(null);
const [distance, setDirections] = useState('');
const [duration, setDuration] = useState('');

const originRef = useRef();
const destinationRef = useRef();


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
        {markerArray.map((marker, index) => {
          return <MarkerF
          key={index}
          position={{lat: marker.coord.lat, lng: marker.coord.lng}}
          onClick={(e) => {
            console.log(e.latLng._De);
            return
            <InfoWindow
              position={{lat: 30.258776290155463, lng: -97.89280590399123}}>
                <div style={{background: `white`}}><h1>YO</h1></div>
              </InfoWindow>
          }}
          />
        })}

        <StandaloneSearchBox
        //   onLoad={onLoad}
        //   onPlacesChanged={
        //     onPlacesChanged
        // }
        >
          <Autocomplete>
            <OriginInput
              type="text"
              placeholder="Enter Origin Here:"
              ref={originRef}
              />
          </Autocomplete>

        </StandaloneSearchBox>
        <StandaloneSearchBox
        //   onLoad={onLoad}
        //   onPlacesChanged={
        //     onPlacesChanged
        // }
        >
          <Autocomplete>

            <DestinationInput
              type="text"
              placeholder="Enter Destination Here:"
              ref={destinationRef}/>
          </Autocomplete>
        </StandaloneSearchBox>

        <SearchButton type="submit" title="Search"/>

      </GoogleMap>
    </MapStyle>
  </Container>

  )
}

const OriginInput = styled.input`
  boxSizing: border-box;
  border: 1px solid transparent;
  width: 180px;
  height: 32px;
  padding: 0 12px;
  borderRadius: 3px;
  boxShadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  fontSize: 14px;
  outline: none;
  textOverflow: ellipses;
  position: absolute;
  left: 30%;
  marginLeft: -120px;
  marginRight: -120px;
`;

const DestinationInput = styled.input`
  boxSizing: border-box;
  border: 1px solid transparent;
  width: 180px;
  height: 32px;
  padding: 0 12px;
  borderRadius: 3px;
  boxShadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  fontSize: 14px;
  outline: none;
  textOverflow: ellipses;
  position: absolute;
  left: 53%;
  marginLeft: -120px;
  marginRight: -120px;
`;
  // ref={${destinationRef}}


const SearchButton = styled.input`
  height: 32px;
  fontSize: 14px;
  position: absolute;
  left: 75%;
  marginLeft: -10px;
  marginRight: -10px;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const MapStyle = styled.div`
  width: 100%;
  height: 100%;
`;