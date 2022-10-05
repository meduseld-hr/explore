import React, {useState, useRef, useEffect} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";
import { Loader } from '@googlemaps/js-api-loader';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import styled from 'styled-components';
import _ from 'lodash';
import MapInfo from './MapInfo';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const MAPS_SECRET = "AIzaSyBSN7vnZvFPDtAVLBzu8LB0N_MEn5fzHXc";

const libraries = ["places"];

export default function App({small, navigateDirection = '../details'}) {
  //setting libraries variable so that console doesn't give warning anymore, per stackOverflow
  const navigate = useNavigate();
  const [libraries] = useState(['places']);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries,
  });

  const [center, setCenter] = useState({
    lat: 30.27466235839214,
    lng: -97.74035019783334,
  })
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');
  const originRef = useRef();
  const destinationRef = useRef();
  const searchRef = useRef(null);
  const mapRef = useRef();

  if(loadError) {
    return "Error loading maps";
  }
  if(!isLoaded) {
    return "Loading Maps";
  }



  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  function handleIdle () {
    console.log('Handle idle called')
    var bounds = mapRef.current.state.map.getBounds()
    const loader = new Loader({apiKey:MAPS_SECRET})
    loader.load().then(() => {
      const service = new google.maps.places.PlacesService(mapRef.current.state.map);
      service.nearbySearch({bounds: bounds, type: 'tourist_attraction'}, (places) => {
        setMarkers(places);
      });
    })
  }
  const throttleIdle = _.debounce(handleIdle, 1000)




  return <Container>
    <Icon icon={!small ? faCompress : faExpand} onClick={() => navigate(navigateDirection)}/>
    <GoogleMap
      mapContainerClassName="map-container"
      mapContainerStyle={mapContainerStyle}
      onDragEnd={throttleIdle}
      onZoomChanged={throttleIdle}
      zoom={12}
      center={center}
      ref={mapRef}
      options={mapOptions}
    >

      {markers.map((marker, index) => (
        <InfoWindow
          key={index}
          position={marker.geometry.location}
        ><MapInfo marker={marker}/></InfoWindow>
      ))}



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
    </GoogleMap>
  </Container>;
}

const Icon = styled(FontAwesomeIcon)`
  z-index: 1;
  font-size: 2em;
  position: absolute;
  right: .5em;
  top: .5em;
  color: white;
  filter: drop-shadow(1px 1px 2px black);
  cursor: pointer;
`
const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 1em;
  overflow: hidden;
  position: relative;
`
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
  width: '100%',
  height: '100%',
};