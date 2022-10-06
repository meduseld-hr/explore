import styled from "styled-components"
import TripCard from "./TripCard"


export default function TripRecommendations({ type, trips }) {

  return(
    <Container>
      <Title>
        {type} Trips
      </Title>
      <Cards>
        {trips.map((trip)=> {
          return <TripCard key={trip.id} title={trip.trip_name} image={trip.thumbnail_url}/>
        })}
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
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: .5em;
`