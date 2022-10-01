import React from "react";
import styled from "styled-components";

export default function StagingArea () {

  return (
    <StagingAreaContainer>
      Staging Area
    </StagingAreaContainer>
  )
}

const StagingAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: .5em;
  background-color: #9e9e9e;
`