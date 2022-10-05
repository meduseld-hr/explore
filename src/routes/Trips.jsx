import { useState } from "react"
import styled from "styled-components"
import TripRecommendations from "../components/trips/TripRecommendations";
import TripSidebarCard from "../components/trips/TripSidebarCard";
import SideBar from "../components/dashboard/Sidebar";
import api from "../functions/api";

export default function Trips () {

  const [search, setSearch] = useState('');
  const [tripsFromSearch, setTripsFromSearch] = useState([])

  const makeSearch = (destination) => {
    console.log('destination function: ', destination)
    api.get('/googlePlaces/placesearch', { params: { destination: destination } })
      .then((res) => {
        let placeID = res.data.candidates[0].place_id;
        api.get('/trips/searchPlaceID', { params: { placeID: placeID } })
          .then(res => {
            // use this data to populate trips they could add
            console.log('this is the response for our Database for the placeID', res);
          })
          .catch((err)=> {
            console.log(err);
          })
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  return (
    <Container>
      <SideBar>
        <SidebarWrapper>
          <Search type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Where to next?"/>
          <Button onClick={()=>{makeSearch(search)}}>Go!</Button>
          <PlanSelector>
            <Selection>Your plans<input type='checkbox'/></Selection>
            <Selection>Shared plans<input type='checkbox'/></Selection>
          </PlanSelector>
          <div>Your Plans</div>
          <TripSidebarCard id={1}/>
          <TripSidebarCard id={2}/>
          <TripSidebarCard id={3}/>
          <TripSidebarCard id={4}/>
          <div>Shared Plans</div>
          <TripSidebarCard id={5}/>
          <TripSidebarCard id={6}/>
          <TripSidebarCard id={7}/>
          <TripSidebarCard id={8}/>
        </SidebarWrapper>
      </SideBar>
      <Dashboard>
        <TripRecommendations type='recommended'/>
        <TripRecommendations type='friends'/>
        <TripRecommendations type='popular'/>
      </Dashboard>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  /* border: 1px solid; */
  display: grid;
  grid-template-columns: 1fr 3fr;
`
const SidebarWrapper = styled.div`
  width: 100%;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: .5em;
`
const Dashboard = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
`
const Search = styled.input`
  height: 30px;
  margin-top: 10px;

`
const PlanSelector = styled.div`
  display: flex;
`
const Selection = styled.div`
  flex: 1;
  border: 1px solid cyan;
`

const Button = styled.button`
  padding: 5px;
  margin: 10px;
  color: #020331fd;
  border-radius: 20px;
  background-color: #4a81efc3;
`;