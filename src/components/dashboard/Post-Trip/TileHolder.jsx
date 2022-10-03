import React from "react";
import styled from "styled-components";
import ReviewTile from "./ReviewTile.jsx";

const TileHolder = (props) => {
  return (
    <Holder>
      <Title>Places You've {props.title}</Title>
      <Container>
        <ReviewTile />
        <ReviewTile />
        <ReviewTile />
      </Container>
    </Holder>
  );
};

const Holder = styled.div`
  width: 100%;
  height: 30%;
  border: solid;
  border-color: blue;
`;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 15;
  text-align: center;
  width: 100%;
  height: 10%;
`;

export default TileHolder;
