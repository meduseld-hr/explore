import React, { useEffect } from "react";
import styled from "styled-components";
import api from "../../../functions/api.js";

const ReviewTile = (props) => {
  // console.log(props.img);

  return (
    <Tile>
      <Title>Location Name</Title>
      <Img src={props.img}></Img>
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
