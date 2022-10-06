import styled from "styled-components"
import TripCard from "./TripCard"


export default function TripRecommendations({type}) {

  return(
    <Container>
    <TitleWrapper>
      <Title>
        {type} Trips
      </Title>
    </TitleWrapper>
      <Cards>
        <TripCard title='rome, italy' image='https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg'/>
        <TripCard title={'paris, france'} image='https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg'/>
        <TripCard title='new orleans, louisiana'/>
        <TripCard title="tokyo, japan"/>
      </Cards>
    </Container>
  )
}

const Title = styled.h2`
  color: ${(props) => {props.theme.color}};
  margin: 0px;
`

const TitleWrapper = styled.div`
  background-color: ${(props) => {props.theme.background}};
  border: 1px solid ${(props) => {props.theme.border}};
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