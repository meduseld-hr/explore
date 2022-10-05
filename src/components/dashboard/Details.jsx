import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Details() {

  return (
    <MainGridCont>
      <InfoContainer>
        <ColCont>
          <div>
            <h2>Place Title</h2>
            <Btn><PlusIcon icon={faPlus}></PlusIcon></Btn>
          </div>
          <Cont>
            <PicContainer>
              Picture Grid
            </PicContainer>
            <Cont>
              Info
            </Cont>
          </Cont>
        </ColCont>
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
  display: flex;
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

const PicContainer = styled.div`
  width: 50%;
  height: 50%;
  flex: 1 0 50%;
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
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