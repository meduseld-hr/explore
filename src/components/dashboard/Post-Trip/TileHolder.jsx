import React from "react";
import styled from "styled-components";
import ReviewTile from "./ReviewTile.jsx";

const TileHolder = (props) => {
  return (
    <Holder>
      {props.places && (
        <>
          <Title>Places You've {props.title}</Title>
          <Container>
            {props.places.map((place) => {
              return <ReviewTile place={place} />;
            })}
          </Container>
        </>
      )}
    </Holder>
  );
};

const Holder = styled.div`
  width: 100%;
  height: 30%;
  border-radius: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 15;
  text-align: center;
  width: 100%;
  height: 10%;
`;

export default TileHolder;
