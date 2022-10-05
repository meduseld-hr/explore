import React from "react";
import styled from "styled-components";
import DarkmodeToggle from "./DarkModeToggle.jsx";

export default function SideBar({ children }) {

  return (
    <SideBarContainer>
      <Img src="/Logo_Light_v2.png" alt="Explore Logo"></Img>
      <Container>{children}</Container>
      <EndContainer>
        <DarkmodeToggle />
      </EndContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #c8c8c8;
`;
const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  border: 2px solid black;
`;

const EndContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Img = styled.img`
  aspect-ratio: 1.77;
  width: 10em;
`;