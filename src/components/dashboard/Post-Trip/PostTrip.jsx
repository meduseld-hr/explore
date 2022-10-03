import React from "react";
import styled from "styled-components";
import UserPhotoContainer from "./UserPhotoContainer.jsx";
import PlacesContainer from "./PlacesContainer.jsx";
import ChatContainer from "./ChatContainer.jsx";
import { useParams } from "react-router-dom";

const PostTrip = () => {
  const {tripId} = useParams();
  return (
    <PostTripContainer class="parent">
      <UserPhotoContainer />
      <PlacesContainer />
      <ChatContainer />
    </PostTripContainer>
  );
};

const PostTripContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 13px;
  grid-row-gap: 10px;
  width: 100%;
  height: 100%;
`;

export default PostTrip;
//CSS
// .div1 { grid-area: 1 / 1 / 3 / 3; }  photos container
// .div2 { grid-area: 3 / 1 / 6 / 2; }  places tiles
// .div3 { grid-area: 3 / 2 / 6 / 3; }  chat
