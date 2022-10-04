import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'

export default function Details() {

  return (
    <ColCont>
      <Cont>
        where the deetz go
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
  width: 100%;
  flex: 1;
`

const ColCont = styled(Cont)`
  flex-direction: column;
`

const SmallCont = styled.div`
  height: 50%;
  display: flex;
  flex: 1 0 50%;
  border: 1px solid;
`