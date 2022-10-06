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
  const [rerender, setRerender] = useState(false);

  const cursors = useRef({});

  function addStop(stop) {
    stop.stopOrder = stops.length > 0 ? stops.at(-1).stop_order + 1 : 0;
    api.post(`/dashboard/${tripId}/stop`, {stop})
      .then((response) => {
        socket.current.emit('rerender', {tripId});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (user) {
      api.get(`/dashboard/${tripId}`)
        .then((response) => {
          setMessages(response.data[1]);
        })
        .catch((err) => {
          console.log(err);
        });
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
      socket.current.on('rerender', (data) => {
        if (parseInt(data.tripId) === parseInt(tripId)) {
          setRerender((rerender) => (
            !rerender
          ));
        }
      })
      socket.current.on('mouse', (data) => {
        if (data.tripId === tripId) {
          let cursor = cursors.current[data.id];
          if (!cursor) {
            cursor = cursors.current[data.id] = document.createElement('div');
            cursor.className = 'cursor';
            let cursorImg = document.createElement('img');
            cursorImg.src = 'https://www.freeiconspng.com/uploads/white-mouse-cursor-arrow-by-qubodup-11.png';
            cursorImg.height = 15;
            document.body.appendChild(cursor);
            let label = document.createElement('div');
            label.innerText = data.nickname;
            cursor.appendChild(cursorImg);
            cursor.appendChild(label);
          }
          cursor.style.transform = `translate(${data.x}px, ${data.y}px)`;
          if (data.pressed) {
            let clickEffectDiv = document.createElement('div');
            clickEffectDiv.className = 'clickEffect';
            clickEffectDiv.style.top = `${data.y + window.innerHeight / 2}px`;
            clickEffectDiv.style.left = `${data.x + window.innerWidth / 2}px`;
            document.body.appendChild(clickEffectDiv);
            clickEffectDiv.addEventListener('animationend', () => {
              clickEffectDiv.parentElement.removeChild(clickEffectDiv);
            });
          }
        }
      });
      socket.current.on('leave', (id) => {
        if (cursors.current[id]) {
          document.body.removeChild(cursors.current[id]);
        }
      });
        window.addEventListener('mousedown', (e) => {
          socket.current.emit('mouse', {
            tripId,
            x: e.pageX - window.innerWidth / 2,
            y: e.pageY - window.innerHeight / 2,
            pressed: true,
            nickname: user.nickname
          });
        });
        window.addEventListener('mousemove', (e) => {
          socket.current.emit('mouse', {
            tripId,
            x: e.pageX - window.innerWidth / 2,
            y: e.pageY - window.innerHeight / 2,
            pressed: false,
            nickname: user.nickname
          });
        });
      return () => {
        socket.current.disconnect();
      }
    }
  }, [user])

  useEffect(() => {
    api.get(`/dashboard/${tripId}`)
      .then((response) => {
        setStops(response.data[0].sort((a, b) => (a.stop_order - b.stop_order)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rerender])

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
              setStops={setStops}
              socket={socket}
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