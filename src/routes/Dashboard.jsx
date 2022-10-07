import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/user';
import SideBar from '../components/dashboard/Sidebar.jsx';
import StagingArea from '../components/dashboard/StagingArea.jsx';
import StopSidebarCard from '../components/dashboard/StopSidebarCard.jsx';
import api from '../functions/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const user = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [stops, setStops] = useState([]);
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const [stopIndex, setStopIndex] = useState(0);
  const [stop, setStop] = useState(null);
  const [rerender, setRerender] = useState(false);

  const [tripPublic, setTripPublic] = useState(true);

  const cursors = useRef({});
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

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

  const handleChange = (e) => {
    if (tripPublic === false) {
      api.put(`/trips/${tripId}/public`)
      .then((response) => {
        setTripPublic(true);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      api.put(`/trips/${tripId}/private`)
      .then((response) => {
        setTripPublic(false);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  };

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
        if (parseInt(message.tripId) === parseInt(tripId)) {
          setMessages((messages) => (
            [...messages, message]
          ));
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
        for (let id in cursors.current) {
          document.body.removeChild(cursors.current[id]);
        }
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
            Current stop: {stopIndex === 0 ? "Trip Origin" : stopIndex}<br />
            Trip Distance: {distance > 0 ? distance : "Add another destination!"}<br />
            Trip Duration: {duration}

          <Search
            type='text'
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
            <Label>
              {tripPublic === false ? <div>Trip is Private</div> : <div>Trip is Public</div>}
              <Input tripPublic={tripPublic} type="checkbox" onChange={handleChange} />
              <Switch />
            </Label>
            <Save onClick={() => {
              navigate('/trips');
            }}>Save Trip</Save>
          </ActionBar>
        </SidebarWrapper>
      </SideBar>
      <StagingArea stops={stops} addStop={addStop} stop={stop} messages={messages} socket={socket} setDistance={setDistance} setDuration={setDuration}/>
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

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 28px;
  background: white;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 0px;
    background: white;
    border: solid;
    border-width: thin;
    transform: translate(0, -50%);
  }
`;

  const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: darkgrey;

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;