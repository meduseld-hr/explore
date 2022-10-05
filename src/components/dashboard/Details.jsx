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
<<<<<<< HEAD

    <MainGridCont>
      <InfoContainer>
        <StopDetails stop={stop} />
      </InfoContainer>
      <MapCont>
        <Map small navigateDirection="../map" />
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
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  width: 100%;
  height: 100%;
`
const InfoContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  border: 1px solid black;
  border-radius: 1.5em;
  padding: 1.5em;
  background-color: ${(props) => props.theme.background};
`

const InfoHeader = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  height: 20%;
`

const ScheduleContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`

const MapCont = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  border: 1px solid black;
  border-radius: 1.5em;
`

const ChatCont = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  padding: 1.5em;
  border: 1px solid black;
  border-radius: 1.5em;
  background-color: ${(props) => props.theme.background};
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

=======
    <Container>
      <Row>
        <StopDetails stop={stop} />
      </Row>
      <Row>
        <MapWrapper>
          <Map small navigateDirection="../map" />
        </MapWrapper>
        <ChatWrapper>
          <Chat />
        </ChatWrapper>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex: 1;
`;
const MapWrapper = styled.div`
  flex: 1;
  height: 100%;
`;
const ChatWrapper = styled.div`
  flex: 1;
  max-height: 500px;
`;
>>>>>>> fff52311919bbc4326d4a10b553bdb1fd1189809
const PlusIcon = styled(FontAwesomeIcon)`
  font-size: 1em;
`;
