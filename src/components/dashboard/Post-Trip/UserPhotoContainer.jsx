import React from "react";
import styled from "styled-components";

const UserPhotoContainer = () => {
  return <PhotoContainer> Photo Container </PhotoContainer>;
};

const PhotoContainer = styled.div`
  grid-area: 1 / 1 / 3 / 3;
  width: 100%;
  height: 100%;
  display: flex;
  border: solid;
`;

export default UserPhotoContainer;
