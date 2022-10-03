import React from "react";
import styled from "styled-components";
import TileHolder from "./TileHolder.jsx";

const PlacesContainer = () => {
  return (
    <ReviewContainer>
      <Title>Review your Trip:</Title>
      <TileHolder title={"Stayed"} />
      <TileHolder title={"Eaten"} />
      <TileHolder title={"Explored"} />
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  grid-area: 3 / 1 / 10 / 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  //TODO fix css
  margin-left: 7px;
`;

const Title = styled.h4`
  width: 100%;
  height: 5%;
  text-align: center;
  margin: 0;
`;
export default PlacesContainer;
