import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from './Expanded-Map/Map';
import { useNavigate, useOutletContext } from 'react-router-dom';
import StopDetails from './details/StopDetails';

export default function Details() {

  const {stop} = useOutletContext();
  const navigate = useNavigate();

  return (
    <ColCont>
      <Cont>
        <Cont>
          <StopDetails stop={stop}/>
          <Cont>
            Calender Here
          </Cont>
        </Cont>
      </Cont>
      <Cont>
        <SmallCont>
          <Map small navigateDirection='../map'/>
        </SmallCont>
        <SmallCont>
          <Chat />
        </SmallCont>
      </Cont>
    </ColCont>
  )
}

const Cont = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  border: 1px solid black;
`

const ColCont = styled(Cont)`
  flex-direction: column;
`

const SmallCont = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex: 1 0 50%;
  border-radius: 2em;
`
const PicContainer = styled.div`
  flex: 1;
  height: 50%;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`

const InfoContainer = styled.div`
  flex: 1;
  height: 50%;
  width: 50%;
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