import styled from 'styled-components';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from '../../functions/api';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

export default function StopSidebarCard({
  length,
  index,
  stop,
  changeIndex,
  stopIndex,
  selected,
  setStops,
  socket,
  waypointCardInfo,
}) {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const decreaseOrder = () => {
    api
      .put(`/dashboard/${stop.id}/decrease`, { tripId })
      .then(() => {
        socket.current.emit('rerender', { tripId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increaseOrder = () => {
    api
      .put(`/dashboard/${stop.id}/increase`, { tripId })
      .then(() => {
        socket.current.emit('rerender', { tripId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeStop = () => {
    api
      .delete(`/dashboard/${stop.id}`)
      .then(() => {
        socket.current.emit('rerender', { tripId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card
      onClick={changeIndex}
      style={{ border: selected ? '2px solid red' : '2px solid black' }}
    >
      <Thumbnail src={stop.thumbnail_url} />
      <Detail>
        <Name>{stop.stop_name}</Name>
        <Loc>{stop.greater_location}</Loc>
      </Detail>
      <Actions>
        {index > 0 && (
          <Action
            icon={faArrowUp}
            onClick={(e) => {
              decreaseOrder();
            }}
          />
        )}
        <Delete
          icon={faXmark}
          onClick={(e) => {
            removeStop();
          }}
        />
        {index < length - 1 && (
          <Action
            icon={faArrowDown}
            onClick={(e) => {
              increaseOrder();
            }}
          />
        )}
      </Actions>
      {waypointCardInfo && (
        <TimeDistance>
          <div>
            distance to next:{' '}
            {waypointCardInfo ? (
              <strong>{waypointCardInfo.distance}</strong>
            ) : null}
          </div>
          <div>
            time to next:{' '}
            {waypointCardInfo ? (
              <strong>{waypointCardInfo.duration}</strong>
            ) : null}
          </div>
        </TimeDistance>
      )}
    </Card>
  );
}

const TimeDistance = styled.div`
  font-size: 0.9em;
  font-style: italic;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
const Thumbnail = styled.img`
  height: 100%;
  width: 70%;
  object-fit: cover;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
`;
const Card = styled.div`
  display: flex;
  height: 100px;
  border-radius: 1em;
  overflow: hidden;
  align-items: center;
  background: ${(props) => {
    props.theme.modal;
  }};
  position: relative;
`;
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 0.2em;
`;
const Action = styled(FontAwesomeIcon)`
  font-size: 1.8em;
  color: #030333;
  cursor: pointer;
  z-index: 1;
`;
const Delete = styled(Action)`
  color: red;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  left: 40%;
`;
const OpenTrip = styled(FontAwesomeIcon)`
  color: #383838;
  font-size: 2em;
  margin-right: 0.5em;
  margin-left: auto;
  cursor: pointer;
  z-index: 1;
`;
const Name = styled.div`
  font-weight: 500;
`;
const Loc = styled.div`
  font-style: italic;
`;
