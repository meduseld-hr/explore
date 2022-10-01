import React from "react";
import styled from "styled-components";

export default function SideBar () {

  return (
    <SideBarContainer>
      Sidebar
    </SideBarContainer>
  )
}

const SideBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: .5em;
  background-color: #c8c8c8;
`