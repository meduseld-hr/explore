import React, { useEffect } from "react";
import styled from "styled-components";
import api from "../../../functions/api.js";
import MAPS_SECRET from "../Expanded-Map/config.js";

const ReviewTile = (props) => {
  const locationName = props.place.name;
  const photo_reference = props.place.photos[0].photo_reference;
  const img_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${MAPS_SECRET}`;
  return (
    <Tile>
      <Title>{locationName}</Title>
      <Img src={img_url}></Img>
    </Tile>
  );
};

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 95%;
  border: solid;
  border-radius: 15px;
  overflow: hidden;
`;
const Title = styled.div`
  font-size: 15px;
  text-align: center;
  background-color: white;
  color: black;
  height: -webkit-fill-available;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin-top: auto;
`;

export default ReviewTile;
