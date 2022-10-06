import React from "react";
import styled, { keyframes } from "styled-components";

const UserPhotoSlider = () => {
  const userImgs = [
    "https://i.imgur.com/SCRl4iP.jpg",
    "https://imgur.com/IiQI1ov.jpg",
    "https://imgur.com/5sHSD14.jpg",
    "https://imgur.com/0ANkcXd.jpg",
    "https://imgur.com/4WHhgVP.jpg",
    "https://imgur.com/VpfXrgy.jpg",
    "https://i.imgur.com/BKZyOl9.jpg",
    "https://i.imgur.com/Dyi9Icm.jpg",
  ];

  return (
    <UserPhotos>
      <Row>
        <ImgGroup>
          {userImgs.map((img) => {
            return <Img src={img} alt="" />;
          })}
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
  background-color: ${(props) => props.theme.background};
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
     transform: translate3d(-28%,0,0);
   }
`;
const ImgGroup = styled.div`
  display: flex;
  width: 100%;
  animation-delay: 1s;
  animation: ${travel} 18s ease-in-out infinite;
`;

const Img = styled.img`
  flex-shrink: 1;
  object-fit: cover;
  height: 220px;
  border-radius: 10px;
`;

export default UserPhotoSlider;
