import styled from "styled-components"
import TripCard from "./TripCard"


export default function TripRecommendations({ type, trips }) {

  return(
    <Container>
    <TitleWrapper>
      <Title>
        {type} Trips
      </Title>
    </TitleWrapper>
      <Cards>
        {trips.map((trip)=> {
          return <TripCard key={trip.id} title={trip.trip_name} image={trip.thumbnail_url}/>
        })}
      </Cards>
    </Container>
  )
}

const Title = styled.h2`
  color: ${(props) => {props.theme.color}};
  margin: 0px;
`

const TitleWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 1.5em;
  width: fit-content;
  padding: 0 1em 0 1em;
  margin: 1em 0 1em 0;
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