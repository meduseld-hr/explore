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
  // receieve an array of stops on a trip
  // console.log(completedTrip);

  // useEffect(() => {
  //   let options = {
  //     method: "GET",
  //     url: "/googlePlaces/placesearch",
  //     params: {
  //       destination: "dennys",
  //     },
  //   };
  //   api(options)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <PostTripContainer>
      <UserPhotoContainer stops={completedTrip} />
      <PlacesContainer stops={completedTrip} />
      <CommentContainer />
    </PostTripContainer>
  );
};

const PostTripContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(9, 1fr);
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
