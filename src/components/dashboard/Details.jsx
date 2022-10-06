import React from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from './Expanded-Map/Map';
import { useNavigate, useOutletContext } from 'react-router-dom';
import StopDetails from './details/StopDetails';

export default function Details() {
  const { stop } = useOutletContext();
  const navigate = useNavigate();

  return (

    <MainGridCont>
      <InfoContainer>
        <StopDetails stop={stop} />
      </InfoContainer>
      <MapCont>
        <Map small navigateDirection="../map" />
      </MapCont>
      <Chat />
    </MainGridCont>
  )
}

const MainGridCont = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 1.5em;
  grid-row-gap: 1.5em;
  width: 100%;
  height: 100%;
`
const InfoContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  border: 1px solid black;
  border-radius: 1.5em;
  padding: 1.5em;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
`

const InfoHeader = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  height: 20%;
`

const ScheduleContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`

const MapCont = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  border: 1px solid black;
  border-radius: 1.5em;
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
`;
