import { useState } from "react"
import styled from "styled-components"
import TripRecommendations from "../components/trips/TripRecommendations";
import TripSidebarCard from "../components/trips/TripSidebarCard";


export default function Trips () {

  const [search, setSearch] = useState('');

  return (
    <Container>
      <Sidebar>
        <Search type="text" value={search} onChange={e => setSearch(e.target.value)}/>
        <PlanSelector>
          <Selection>Your plans<input type='checkbox'/></Selection>
          <Selection>Shared plans<input type='checkbox'/></Selection>
        </PlanSelector>
        <TripSidebarCard/>
        <TripSidebarCard/>
        <TripSidebarCard/>
        <TripSidebarCard/>
      </Sidebar>
      <Dashboard>
        <TripRecommendations type='recommended'/>
        <TripRecommendations type='friends'/>
      </Dashboard>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  border: 1px solid;
  display: grid;
  grid-template-columns: 30% auto;
`
const Sidebar = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
`
const Dashboard = styled.div`
  grid-column: 2;
`
const Search = styled.input`

`
const PlanSelector = styled.div`
  display: flex;
`
const Selection = styled.div`
  flex: 1;
  border: 1px solid cyan;
`