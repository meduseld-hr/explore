import React from "react";
import styled from "styled-components";
import DarkmodeToggle from "./DarkModeToggle.jsx";
import { useOutletContext } from "react-router-dom";

export default function SideBar({ children }) {
  const { theme } = useOutletContext();

  return (
    <SideBarContainer>
      {theme === 'light'
        ? <Img src="/Logo_Light_v2.png" alt="Explore Logo"/>
        : <Img src="/Logo_Dark_v2.png" alt="Explore Logo"/>
      }
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
  border-radius: 1.5em;
  padding: 1em;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
`;
const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;

const EndContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Img = styled.img`
  aspect-ratio: 1.77;
  width: 10em;
`;
