import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/user";
import SideBar from "../components/dashboard/Sidebar.jsx";
import StagingArea from "../components/dashboard/StagingArea.jsx";
import StopSidebarCard from "../components/dashboard/StopSidebarCard.jsx";
import api from '../functions/api';
import {useParams} from "react-router-dom";

export default function Dashboard () {

  const {tripId} = useParams();

  const user = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [stops, setStops] = useState([]);

  useEffect(() => {
    api.get(`/dashboard/${tripId}`)
    .then((response) => {
      setStops(response.data[0].sort((a, b) => (a.stop_order - b.stop_order)));
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <DashContainer>
      <SideBar>
        <SidebarWrapper>
          <Search type="text" value={search} onChange={e => setSearch(e.target.value)}/>
          {stops.map((stop, index) => <StopSidebarCard stop={stop} key={index} />)}
          <ActionBar>
            Private<input type='checkbox' />Public
            <Save>Save Trip</Save>
          </ActionBar>
        </SidebarWrapper>
      </SideBar>
      <StagingArea />
    </DashContainer>
  )
}

const DashContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  border: 2px solid black;
`
const SidebarWrapper = styled.div`
  width: 100%;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: .5em;
`
const Search = styled.input`

`
const ActionBar = styled.div`
  display: flex;
`;
const Slider = styled.input`
`
const Save = styled.button`
  flex: 1;
`