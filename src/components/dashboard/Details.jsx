import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Details() {

  return (
    <ColCont>
      <Cont>
        <Cont>
          <ColCont>
            <Cont>
              <h2>Place Title</h2>
              <Btn><PlusIcon icon={faPlus}></PlusIcon></Btn>
            </Cont>
            <Cont>
              <Cont>
                Picture Grid
              </Cont>
              <Cont>
                Info
              </Cont>
            </Cont>
          </ColCont>
          <Cont>
            Calender Here
          </Cont>
        </Cont>
      </Cont>
      <Cont>
        <SmallCont>
          replace with map
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
  height: 50%;
  display: flex;
  flex: 1 0 50%;
  border: 1px solid black;
`

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  border: 2px solid black;
  border-radius: 1em;
`

const PlusIcon = styled(FontAwesomeIcon)`
  font-size: 1em;
`