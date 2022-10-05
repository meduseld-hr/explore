import React from "react";
import styled from "styled-components";
import PostTrip from "./Post-Trip/PostTrip.jsx";
import { Outlet } from "react-router-dom";


export default function StagingArea({stops, addStop, messages, socket}) {

  return (
    <StagingAreaContainer>
      <Outlet context={[stops, addStop, messages, socket]}/>
    </StagingAreaContainer>
  );
}

const StagingAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #9e9e9e;
`;
