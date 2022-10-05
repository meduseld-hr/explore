import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../../functions/api';

export default function StopDetails({ stop }) {
  if (!stop) return <></>;
  const [photos, setPhotos] = useState([]);
  const { stop_name, greater_location, google_place_id } = stop;
  useEffect(() => {
    api.get('/googlePlaces/placeinfo', {
      params: { placeID: google_place_id },
    }).then(res => setPhotos(res.data.result.photos.slice(0, 5)));
  }, [stop]);
  return (
    <Container>
      <Details>
        <Name>{stop_name}</Name>
        <Loc>{greater_location}</Loc>
      </Details>
      <Photos>{photos.map((photo, index) => <Photo key={index} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA`}/>)}</Photos>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  border: 1px solid black;
  padding: 0.5em;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
const Name = styled.h2`
  margin: 0;
`;
const Loc = styled.div`
  font-style: italic;
`;
const Photos = styled.div`
  display: flex;
  gap: .5em;
  overflow: auto;
`;
const Photo = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`
