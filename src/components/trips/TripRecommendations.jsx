import styled from "styled-components"
import TripCard from "./TripCard"


export default function TripRecommendations({ type, trips }) {

  const displayTrips = trips.slice(0, 4);

  return(
    <Container>
      <Title>
        {type} Trips
      </Title>
      <Cards>
        {displayTrips.map((trip)=> {
          return <TripCard key={trip.id} id={trip.id} title={trip.trip_name} image={trip.thumbnail_url}/>
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