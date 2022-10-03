import { useState } from "react"
import styled from "styled-components"
import TripRecommendations from "../components/trips/TripRecommendations";
import TripSidebarCard from "../components/trips/TripSidebarCard";
import SideBar from "../components/dashboard/Sidebar";


export default function Trips () {

  const [search, setSearch] = useState('');

  return (
    <Container>
      <SideBar>
        <SidebarWrapper>
          <Search type="text" value={search} onChange={e => setSearch(e.target.value)}/>
          <PlanSelector>
            <Selection>Your plans<input type='checkbox'/></Selection>
            <Selection>Shared plans<input type='checkbox'/></Selection>
          </PlanSelector>
          <TripSidebarCard/>
          <TripSidebarCard/>
          <TripSidebarCard/>
          <TripSidebarCard/>
        </SidebarWrapper>
      </SideBar>
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
  grid-template-columns: 20% 80%;
`
const SidebarWrapper = styled.div`
  width: 100%;
  grid-column: 1;
  display: flex;
  flex-direction: column;
`
const Dashboard = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
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