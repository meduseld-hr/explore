import React from "react";
import styled from "styled-components";

export default function SideBar () {

  return (
    <SideBarContainer>
      <Img
        src="Logo_Light_v2.png"
        alt="Explore Logo"
      ></Img>
      <Container>
        This is where either Trips or Stops go
      </Container>
      <EndContainer>
        <DarkmodeToggle>☀</DarkmodeToggle>
      </EndContainer>
    </SideBarContainer>
  )
}

const SideBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: .5em;
  background-color: #c8c8c8;
`
const Container = styled.div`
  display: flex;
  border: 2px solid black;
`

const EndContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

const Img = styled.img`
  aspect-ratio: 1.77;
  width: 10em;
`

const DarkmodeToggle = styled.button`
`