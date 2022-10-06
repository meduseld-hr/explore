import { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/user";
import SideBar from "../components/dashboard/Sidebar.jsx";
import StagingArea from "../components/dashboard/StagingArea.jsx";
import StopSidebarCard from "../components/dashboard/StopSidebarCard.jsx";
import api from '../functions/api';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { tripId } = useParams();

  const user = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [stops, setStops] = useState([]);
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const [stopIndex, setStopIndex] = useState(0);
  const [stop, setStop] = useState(null);

  function addStop(stop) {
    stop.stopOrder = stops.length > 0 ? stops.at(-1).stop_order + 1 : 0;
    api.post(`/dashboard/${tripId}/stop`, {stop})
      .then((response) => {

        api.get(`/dashboard/${tripId}`)
          .then((response) => {
            setStops(response.data[0].sort((a, b) => (a.stop_order - b.stop_order)));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    // setStops([...stops, stop]);
  }

  useEffect(() => {
    socket.current = io(`http://localhost:3000`, {
      withCredentials: false
    });
    socket.current.on('chat message', (message) => {
      if (message.tripId === tripId) {
        setMessages((messages) => (
          [...messages, message]
        ));
        const messageList = document.getElementById('messages');
        if (scrollBottom.current === messageList.scrollTop) {
          messageList.scrollTo(0, messageList.scrollHeight);
          scrollBottom.current = messageList.scrollTop;
        }
      }
    });
    api.get(`/dashboard/${tripId}`)
      .then((response) => {
        setStops(response.data[0].sort((a, b) => (a.stop_order - b.stop_order)));
        setMessages(response.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      socket.current.disconnect();
    }
  }, [])

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
              stop={stop}
              key={index}
              selected={index === stopIndex}
              setStops={setStops}
              changeIndex={() => setStopIndex(index)}
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
      <StagingArea stops={stops} addStop={addStop} stop={stop} messages={messages} socket={socket} />
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
