import React, { useEffect } from "react";
import styled from "styled-components";
import TileHolder from "./TileHolder.jsx";
import api from "../../../functions/api.js";

const PlacesContainer = () => {
  useEffect(() => {
    let options = {
      method: "GET",
      url: "/trips",
    };
    api(options)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

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
