import React, {useState, useRef} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import styled from 'styled-components';

const MAPS_SECRET = "AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA";

const libraries = ["places"];

export default function App() {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');
  const originRef = useRef();
  const destinationRef = useRef();
  const searchRef = useRef(null);

  const mapRef = useRef();

  //setting libraries variable so that console doesn't give warning anymore, per stackOverflow
  const [libraries] = useState(['places']);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries,
  });

  if(loadError) {
    return "Error loading maps";
  }
  if(!isLoaded) {
    return "Loading Maps";
  }
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    // clickableIcons: true,
  }

  const center = {
    lat: 30.27466235839214,
    lng: -97.74035019783334,
  }

  const idleHandler = () => {
    // console.log(mapRef.current.state.map.FUNCTIONGOESHERE)
    const bounds = mapRef.current.state.map.getBounds();
    console.log(mapRef.current.state.map)
    //call Places API
      //set state of markers array with PlacesAPI

  }

  return <div>
    <GoogleMap
      mapContainerClassName="map-container"
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={mapOptions}
      ref={mapRef}
      onClick={(e) => {
        console.log(e.placeId);
        // setMarkers(prev => [...prev,{
        //   lat: e.latLng.lat(),
        //   lng: e.latLng.lng(),
        //   place_id: e.placeId,
        //   time: new Date(),
        // }]);
      }}
      onIdle={idleHandler}
    >

      {markers.map((marker, index) => (
        <Marker
          key={marker.time.toISOString()}
          position={{lat: marker.lat, lng: marker.lng}}
          onClick={() => {
            setSelected(marker);
          }}
        />
      ))}

      {selected ? (
      <InfoWindow
        position={{lat: selected.lat, lng: selected.lng}}
        onCloseClick={() => {
          setSelected(null);
        }}
      >
        <div>
          <input type="submit"></input>
        </div>
      </InfoWindow>) : null}


      <Autocomplete>
        <div>
          <SearchInput
            type="text"
            placeholder="Find a location:"
            ref={searchRef}
          />
        </div>
      </Autocomplete>

      <SearchButton
        type="submit"
        value="Search"
        onClick={(e) => {
          console.log(searchRef.current.value);
          setLocationSearch(searchRef.current.value);
          searchRef.current.value = '';

          //Add Marker to Map
          //Pan to Marker on Map
      }}
      />

      <AddStopButton
        type="submit"
        value="Add Stop"
        onClick={(e) => {

          //POST stop to trip
          //Pan to trip route on Map
        }}
      />

    </GoogleMap>
  </div>;
}

const SearchButton = styled.input`
  height: 32px;
  fontSize: 14px;
  position: absolute;
  left: 50%;
  marginLeft: -10px;
  marginRight: -10px;
`;

const AddStopButton = styled.input`
  height: 32px;
  fontSize: 14px;
  position: absolute;
  left: 60%;
  marginLeft: -10px;
  marginRight: -10px;
`;

const SearchInput = styled.input`
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

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};