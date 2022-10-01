import React from "react";
import styled from "styled-components";

const PlacesContainer = () => {
  return <PlacesTiles>Places Container</PlacesTiles>;
};

const PlacesTiles = styled.div`
  grid-area: 3 / 1 / 7 / 2;
  width: 100%;
  height: 100%;
  display: flex;
  border: solid;
`;

export default PlacesContainer;
