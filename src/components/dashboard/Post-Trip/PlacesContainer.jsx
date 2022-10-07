import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TileHolder from "./TileHolder.jsx";
import api from "../../../functions/api.js";

const PlacesContainer = (props) => {
  const [buckets, setBuckets] = useState(null);

  //sort stops by location details
  const locationBuckets = {
    lodging: [],
    dining: [],
    explored: [],
  };
  useEffect(() => {
    let promises = [];
    setBuckets(null);

    for (let i = 0; i < props.stops.length; i++) {
      let options = {
        method: "GET",
        url: "/googlePlaces/placeinfo",
        params: {
          placeID: props.stops[i].google_place_id,
        },
      };
      promises.push(api(options));
    }
    Promise.all(promises)
      .then((response) => {
        response.forEach((response) => {
          var locationTypes = response.data.result.types;
          if (
            !locationTypes.includes("restraunt") &&
            !locationTypes.includes("food") &&
            !locationTypes.includes("lodging")
          ) {
            if (locationBuckets.explored.length < 3) {
              locationBuckets.explored.push(response.data.result);
            }
          } else if (
            locationTypes.includes("restraunt") ||
            locationTypes.includes("food")
          ) {
            if (
              locationBuckets.dining.length < 3 &&
              !locationBuckets.dining.includes(response.data.result)
            ) {
              locationBuckets.dining.push(response.data.result);
            }
          } else if (locationTypes.includes("lodging")) {
            if (locationBuckets.lodging.length < 3) {
              locationBuckets.lodging.push(response.data.result);
            }
          }
        });
        setBuckets(locationBuckets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ReviewContainer>
      <Title>Review your Trip:</Title>
      {buckets && (
        <>
          <TileHolder title={"Stayed"} places={buckets.lodging} />
          <TileHolder title={"Eaten"} places={buckets.dining} />
          <TileHolder title={"Explored"} places={buckets.explored} />
        </>
      )}
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  grid-area: 3 / 1 / 10 / 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 1.5em;
  padding: 1em;
`;

const Title = styled.h4`
  width: 100%;
  height: 5%;
  text-align: center;
  margin: 0;
`;
export default PlacesContainer;
