import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'

export default function Details() {

  return (
    <Container>
      <DetailsCont>where the deetz go</DetailsCont>
      <div>replace with map</div>
      <Chat />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`

const DetailsCont = styled(Container)`
  grid-area: 1 / span 2;
`
const B = styled.div`
  border: 1px solid green;
`