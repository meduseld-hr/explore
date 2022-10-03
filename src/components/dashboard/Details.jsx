import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'

export default function Details() {

  return (
    <ColContainer>
      <DetailsCont>where the deetz go</DetailsCont>
      <Container>
        <div>replace with map</div>
        <Chat />
      </Container>
    </ColContainer>
  )
}

const Container = styled.div`
  display: flex;
`

const ColContainer = styled.div`
  flex-direction: column;
  justify-content: space-between;
`

const DetailsCont = styled(Container)`

`