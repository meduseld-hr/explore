import styled from 'styled-components';

export default function TripTiles({ trip }) {

  return (<TileDiv>
    <img style={{ height: "10vw", width: "10vw" }} src={trip.ThumbnailURL} alt="trip thumbnailURL pic" />
    <p>{trip.trip_name}</p>
  </TileDiv>)
}

const TileDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
  margin: 1.2em;
`;

