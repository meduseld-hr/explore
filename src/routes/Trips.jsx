import { useState, useEffect } from "react"
import styled from "styled-components"
import TripRecommendations from "../components/trips/TripRecommendations";
import TripSidebarCard from "../components/trips/TripSidebarCard";
import SideBar from "../components/dashboard/Sidebar";
import api from "../functions/api";
import { useNavigate } from 'react-router-dom';


export default function Trips () {

  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tripsFromSearch, setTripsFromSearch] = useState([])
  const [myTrips, setMyTrips] = useState([])
  const [recommendedTrips, setRecommendedTrips] = useState([])
  const [recentTrips, setRecentTrips] = useState([])

  useEffect(()=> {
    //USER Trips for sidebar
    api.get('/trips/')
      .then((response) => {
        setMyTrips(response.data);
      })
      .catch((err)=> {
        console.log(err);
      });

    //Recommended Trips
    api.get('/trips/popular')
      .then((response) => {
        console.log('popular trips include: ', response.data)
        setRecommendedTrips(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    //Recent Trips
    api.get('/trips/recent')
      .then((response) => {
        console.log('recent trips include: ', response.data)
        setRecentTrips(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  const makeSearch = (destination) => {
    api.get('/trips/searchTripsByName', { params: { placeName: destination } })
      .then(res => {
        console.log('this is the response for our Database for the name', res.data);
        setTripsFromSearch(res.data);
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  const makeNewTrip = (destination) => {

    api.post('/trips/', { tripName: destination })
      .then((response)=> {
        // NAVIGATE TO DASHBOARD/TRIPID
        let tripID = response.data.trip_id
        navigate(`../dashboard/${tripID}/details`)
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
          <Button onClick={()=>{makeNewTrip(search)}}>Create New Trip</Button>
          <div>Your Plans</div>
          {myTrips.length === 0 ? <div></div> : myTrips.map( (trip) => {
            return <TripSidebarCard key={trip.id} trip={trip}/>
          })}
        </SidebarWrapper>
      </SideBar>
      <Dashboard>
        {tripsFromSearch.length > 0 && <TripRecommendations type='Search Result' trips={tripsFromSearch} />}
        <TripRecommendations type='Recommended' trips={recommendedTrips} />
        <TripRecommendations type='Recent' trips={recentTrips} />
      </Dashboard>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  /* border: 1px solid; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 1em;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
`
const SidebarWrapper = styled.div`
  width: 100%;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: .5em;
`
const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-height: 60vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  };
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
  /* border: 1px solid cyan; */
`

const Button = styled.button`
  padding: 5px;
  margin: 10px;
  color: #020331fd;
  border-radius: 20px;
  background-color: #4a81efc3;
`;