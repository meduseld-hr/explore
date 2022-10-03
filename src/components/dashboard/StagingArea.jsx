import React from "react";
import styled from "styled-components";
import PostTrip from "./Post-Trip/PostTrip.jsx";
import Chat from './Chat.jsx';


export default function StagingArea() {
  return (
    <StagingAreaContainer>
      <PostTrip />
      <Chat />
    </StagingAreaContainer>
  );
}

const StagingAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0.5em;
  background-color: #9e9e9e;
`;
