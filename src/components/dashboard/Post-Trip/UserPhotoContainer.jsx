import React from "react";
import styled from "styled-components";
import UserPhotoSlider from "./UserPhotoSlider.jsx";

const UserPhotoContainer = () => {
  return (
    <PhotoContainer>
      <UserPhotoSlider />
    </PhotoContainer>
  );
};

const PhotoContainer = styled.div`
  grid-area: 1 / 1 / 3 / 3;
  width: 100%;
  height: 100%;
`;

export default UserPhotoContainer;
