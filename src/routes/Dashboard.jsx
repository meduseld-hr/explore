import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/user';
import SideBar from '../components/dashboard/Sidebar.jsx';
import StagingArea from '../components/dashboard/StagingArea.jsx';
import StopSidebarCard from '../components/dashboard/StopSidebarCard.jsx';
import api from '../functions/api';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { tripId } = useParams();

  const user = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [stops, setStops] = useState([]);
  const [stopIndex, setStopIndex] = useState(0);
  const [stop, setStop ] = useState(null);

  function addStop(stop) {
    stop.stop_order = stops.length > 0 ? stops.at(-1).stop_order + 1 : 0;
    setStops([...stops, stop]);
  }
  function swapStops(e, index1, index2) {
    e.stopPropagation();
    const newStops = stops.slice();
    const stop = newStops[index1];
    newStops[index1] = newStops[index2];
    newStops[index2] = stop;
    setStopIndex(index2);
    setStops(newStops);
  }
  function deleteStop(e, index) {
    e.stopPropagation();
    const newStops = stops.slice()
    newStops.splice(index, 1)
    setStops(newStops);
  }

  useEffect(() => {
    api
      .get(`/dashboard/${tripId}`)
      .then((response) => {
        setStops(response.data[0].sort((a, b) => a.stop_order - b.stop_order));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setStop(stops[stopIndex])
  }, [stops, stopIndex])

  return (
    <DashContainer>
      <SideBar>
        <SidebarWrapper>
          Current stop: {stopIndex}
          <Search
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {stops.map((stop, index) => (
            <StopSidebarCard
              length={stops.length}
              stop={stop}
              key={index}
              index={index}
              selected={index === stopIndex}
              changeIndex={() => setStopIndex(index)}
              swapStops={swapStops}
              deleteStop={deleteStop}
            />
          ))}
          <ActionBar>
            Private
            <input type="checkbox" />
            Public
            <Save>Save Trip</Save>
          </ActionBar>
        </SidebarWrapper>
      </SideBar>
      <StagingArea stops={stops} addStop={addStop} stop={stop} />
    </DashContainer>
  );
}

const DashContainer = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 1em;
  gap: 1em;
`
const SidebarWrapper = styled.div`
  width: 100%;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
const Search = styled.input``;
const ActionBar = styled.div`
  display: flex;
`;
const Slider = styled.input``;
const Save = styled.button`
  flex: 1;
`;
