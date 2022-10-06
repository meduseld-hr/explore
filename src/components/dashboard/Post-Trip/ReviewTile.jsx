import React, { useEffect } from "react";
import styled from "styled-components";
import api from "../../../functions/api.js";
import { placesKey } from "../../../../config.js";

const ReviewTile = (props) => {
  const locationName = props.place.name;
  const photo_reference = props.place.photos[0].photo_reference;
  const img_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${placesKey}`;

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
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default ReviewTile;
