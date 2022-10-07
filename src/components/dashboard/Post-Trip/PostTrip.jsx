import React, { useEffect } from "react";
import styled from "styled-components";
import UserPhotoContainer from "./UserPhotoContainer.jsx";
import PlacesContainer from "./PlacesContainer.jsx";
import CommentContainer from "./CommentContainer.jsx";
import api from "../../../functions/api.js";
import { useParams } from "react-router-dom";
import { completedTrip } from "./dummyData.js";

const PostTrip = () => {
  const { tripId } = useParams();

  return (
    <PostTripContainer>
      <UserPhotoContainer />
      <PlacesContainer stops={completedTrip} />
      <CommentContainer />
    </PostTripContainer>
  );
};

const PostTripContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-column-gap: 1.5em;
  grid-row-gap: 1.5em;
  width: 100%;
  height: 100%;
`;

export default PostTrip;
//CSS
// .div1 { grid-area: 1 / 1 / 3 / 3; }  photos container
// .div2 { grid-area: 3 / 1 / 6 / 2; }  places tiles
// .div3 { grid-area: 3 / 2 / 6 / 3; }  chat
