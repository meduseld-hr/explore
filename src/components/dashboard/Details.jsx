import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from './Expanded-Map/Map';
import { useNavigate } from 'react-router-dom';

export default function Details() {

  const navigate = useNavigate();

  return (
    <MainGridCont>
      <InfoContainer>
        <InfoHeader>
          <h2>Place Title <Btn><PlusIcon icon={faPlus}></PlusIcon></Btn></h2>
          <p>Some description about this place?</p>
        </InfoHeader>
        <PicContainer>
          Picture Grid
        </PicContainer>
        <ScheduleContainer>
          Schedule
        </ScheduleContainer>
      </InfoContainer>
      <MapCont>
        replace with map
      </MapCont>
      <ChatCont>
        <Chat />
      </ChatCont>
    </MainGridCont>
  )
}

const MainGridCont = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  width: 100%;
  height: 100%;
  padding: 1em;
`
const InfoContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  padding: 1.5em;
  border: 1px solid black;
  border-radius: 2em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const InfoHeader = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  height: 20%;
`

const PicContainer = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`

const ScheduleContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`

const MapCont = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  padding: 1.5em;
  border: 1px solid black;
  border-radius: 2em;
`

const ChatCont = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  padding: 1.5em;
  border: 1px solid black;
  border-radius: 2em;
`

const Cont = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border: 1px solid black;
`

const ColCont = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid black;
`

const Btn = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 2em;
  height: 2em;
  border: 2px solid black;
  border-radius: 1em;
  background-color: white;
`

const PlusIcon = styled(FontAwesomeIcon)`
  font-size: 1em;
`