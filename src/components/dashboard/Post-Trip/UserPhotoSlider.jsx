import React from "react";
import styled, { keyframes } from "styled-components";

const UserPhotoSlider = () => {
  return (
    <UserPhotos>
      <Row>
        <ImgGroup>
          <Img src="https://picsum.photos/seed/3/342/180" alt="" />
          <Img src="https://picsum.photos/seed/4/342/180" alt="" />
          <Img src="https://picsum.photos/seed/5/342/180" alt="" />
          <Img src="https://picsum.photos/seed/6/342/180" alt="" />
          <Img src="https://picsum.photos/seed/7/342/180" alt="" />
          <Img src="https://picsum.photos/seed/8/342/180" alt="" />
        </ImgGroup>
      </Row>
    </UserPhotos>
  );
};

const UserPhotos = styled.div`
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border: 1px solid
    ${(props) => {
      props.theme.border;
    }};
  border-radius: 1.5em;
`;

const Row = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
`;

const travel = keyframes`
  0%, 100% {
     transform: translate3d(0,0,0);
   }
  50% {
     transform: translate3d(-47%,0,0);
   }
`;
const ImgGroup = styled.div`
  display: flex;
  width: 100%;
  animation-delay: 1s;
  animation: ${travel} 30s ease-in-out infinite;
`;

const Img = styled.img`
  flex-shrink: 0;
  object-fit: cover;
`;

export default UserPhotoSlider;
