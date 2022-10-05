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
const PlusIcon = styled(FontAwesomeIcon)`
  font-size: 1em;
`;
