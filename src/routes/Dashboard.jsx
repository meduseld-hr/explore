import { useContext, useState, useEffect, useRef } from "react";
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
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  function addStop (stop) {
    stop.stop_order = stops.at(-1) + 1;
    setStops([...stops, stop])
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
      <StagingArea stops={stops} addStop={addStop} messages={messages} socket={socket} />
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