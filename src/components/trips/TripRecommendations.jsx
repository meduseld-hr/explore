import styled from "styled-components"
import TripCard from "./TripCard"


export default function TripRecommendations({type}) {

  return(
    <Container>
      <Title>
        {type} trips
      </Title>
      <Cards>
        <TripCard/>
        <TripCard/>
        <TripCard/>
        <TripCard/>
      </Cards>
    </Container>
  )
}

const Title = styled.h2`
  margin: 0;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Cards = styled.div`
  display: flex;
  align-content: space-between;
`