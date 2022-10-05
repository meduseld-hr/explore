import React, { useState, useRef, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import styled from 'styled-components';
import _ from 'lodash';
import MapInfo from './MapInfo';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const MAPS_SECRET = 'AIzaSyBSN7vnZvFPDtAVLBzu8LB0N_MEn5fzHXc';

const libraries = ['places'];

export default function App({ small, navigateDirection = '../details' }) {
  //setting libraries variable so that console doesn't give warning anymore, per stackOverflow
  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAPS_SECRET,
    libraries,
  });

  const [center, setCenter] = useState({
    lat: 30.27466235839214,
    lng: -97.74035019783334,
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [autocomplete, setAutoComplete] = useState('');
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');

  const searchRef = useRef(null);
  const mapRef = useRef();

  const [tripRoute, setTripRoute] = useState(null)
  const [tripStops, setTripStops] = useState([
    {lat: 30.281812053292956, lng: -97.73815329458314},
    {lat: 30.230781421835704, lng: -97.75279748278045},
    {lat: 30.26518019321872, lng: -97.7720555943571},
    {lat: 30.301887158191406, lng: -97.8260877885794}
  ])

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef();
  const destinationRef = useRef();
  const [stops, addStop] = useOutletContext();

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading Maps';
  }

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  function handleIdle() {
    console.log('Handle idle called');
    var bounds = mapRef.current.state.map.getBounds();
    const loader = new Loader({ apiKey: MAPS_SECRET });
    loader.load().then(() => {
      const service = new google.maps.places.PlacesService(mapRef.current.state.map);
      service.nearbySearch({bounds: bounds, type: 'tourist_attraction'}, (places) => {
        console.log("currently displayed places: ", places)
        setMarkers(places);
      });
    })
  }

  const throttleIdle = _.debounce(handleIdle, 1000);

  const onSearchLoad = (autocomplete) => {
    setAutoComplete(autocomplete);
  }

  const onPlaceChanged = () => {
    if(autocomplete !== null) {
      const tempNewPlaceInfo = autocomplete.getPlace();
      setCenter({
        lat:  tempNewPlaceInfo.geometry.location.lat(),
        lng:  tempNewPlaceInfo.geometry.location.lng()
      });
      searchRef.current.value = '';
    } else {
      console.log('Autocomplete not loaded yet')
    }
  }

  const handleDirections = () => {

    //create and properly format new array from tripStops
    const tempAllStops = [];
    for (let i = 0; i < tripStops.length; i++) {
      tempAllStops.push({
        location: {
          lat: tripStops[i].lat,
          lng: tripStops[i].lng
        },
        stopover: true,
      })
    }
    //mutate tripStops clone to get waypoints
    const tempWaypoints = tempAllStops.slice();
    tempWaypoints.shift()
    tempWaypoints.pop();
    console.log("waypoints: ", tempWaypoints);


    const loader = new Loader({apiKey:MAPS_SECRET});
    loader.load().then(() => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin:  tempAllStops[0].location,//first stop
      destination:  tempAllStops[tempAllStops.length - 1].location,//last stop
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: tempWaypoints,//all stops without first and last
    }, (directions) => {
      setTripRoute(directions);
      setDistance(directions.routes[0].legs[0].distance.text);
      setDuration(directions.routes[0].legs[0].duration.text);
      console.log("directions response: ", directions);
      }
    )})
    .catch(err => {
      console.log(err)
    });
  }


  return (
    <Container>
    {shouldRedirect && <Navigate to={navigateDirection} />}
      <Icon
        icon={!small ? faCompress : faExpand}
        onClick={() => setShouldRedirect(true)}
      />
      <GoogleMap
        mapContainerClassName="map-container"
        mapContainerStyle={mapContainerStyle}
        onDragEnd={throttleIdle}
        onZoomChanged={throttleIdle}
        onClick={handleDirections}
        zoom={8}
        center={center}
        ref={mapRef}
        options={mapOptions}
      >
      {markers.map((marker, index) => (
        <InfoWindow key={index} position={marker.geometry.location}>
          <MapInfo addStop={addStop} marker={marker} />
        </InfoWindow>
      ))}

      {tripRoute && <DirectionsRenderer directions={tripRoute} />}

      <Autocomplete
        onLoad={onSearchLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <div>
          <SearchInput
            type="text"
            placeholder="Go to a destination:"
            ref={searchRef}
          />
        </div>
      </Autocomplete>

      {/*Not needed because of Autocomplete functionality*/}
        {/* <SearchButton
          type="submit"
          value="Search"
          onClick={(e) => {
            console.log(searchRef.current.value);
            setLocationSearch(searchRef.current.value);
            searchRef.current.value = '';
          }}
        /> */}

      </GoogleMap>
    </Container>
  );
}

const Icon = styled(FontAwesomeIcon)`
  z-index: 1;
  font-size: 2em;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  color: white;
  filter: drop-shadow(1px 1px 2px black);
  cursor: pointer;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 1em;
  overflow: hidden;
  position: relative;
`;
const SearchButton = styled.input`
  height: 32px;
  fontsize: 14px;
  position: absolute;
  left: 50%;
  marginleft: -10px;
  marginright: -10px;
`;

const AddStopButton = styled.input`
  height: 32px;
  fontsize: 14px;
  position: absolute;
  left: 60%;
  marginleft: -10px;
  marginright: -10px;
`;

const SearchInput = styled.input`
  boxsizing: border-box;
  border: 1px solid transparent;
  width: 180px;
  height: 32px;
  padding: 0 12px;
  borderradius: 3px;
  boxshadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  fontsize: 14px;
  outline: none;
  textoverflow: ellipses;
  position: absolute;
  left: 30%;
  marginleft: -120px;
  marginright: -120px;
`;

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
