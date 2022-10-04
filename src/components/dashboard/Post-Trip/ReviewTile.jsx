import React from "react";
import styled from "styled-components";

const ReviewTile = () => {
  return (
    <Tile>
      <Title>Location Name</Title>
      <Img></Img>
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
`;
const Title = styled.div`
  font-size: 15px;
  text-align: center;
`;
const Img = styled.div`
  background-size: cover;
  background-image: url("https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg");
  width: 100%;
  height: 100%;
  overflow: auto;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export default ReviewTile;
