import React from "react";
import styled from "styled-components";
import ReviewTile from "./ReviewTile.jsx";

const TileHolder = (props) => {
  let test = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=AIzaSyBWNNF-l95ID334274nOsP0JdPa79H96BA`;
  return (
    <Holder>
      <Title>Places You've {props.title}</Title>
      <Container>
        <ReviewTile img={test} />
        <ReviewTile img={test} />
        <ReviewTile img={test} />
      </Container>
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
