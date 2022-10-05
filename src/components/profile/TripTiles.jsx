import styled from 'styled-components';

export default function TripTiles({ trip }) {

  return (<TileDiv>
    <img style={{ height: "50px", width: "50px" }} src={trip.thumbnail_url} alt="trip thumbnailURL pic" />
    <p>{trip.trip_name}</p>
  </TileDiv>)
}

const TileDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
  margin: 1.2em;
  width: 200px
`;

