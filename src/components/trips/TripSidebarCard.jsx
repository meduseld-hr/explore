import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function TripSidebarCard({ trip, deleteTrip }) {
  const navigate = useNavigate();

  return (
    <Card>
      {trip.thumbnail_url
        ? <Thumbnail src={trip.thumbnail_url} />
        : <Thumbnail src="https://picsum.photos/200/300" />}

      <Detail>
        <div>{trip.trip_name}</div>
      </Detail>
      <Icons>
        <DeleteTrip icon={faTrash} onClick={() => deleteTrip(trip.id)} />
        <OpenTrip icon={faPlay} onClick={() => navigate(`../dashboard/${trip.id}/details`)}/>
        <PostTrip icon={faCheck} onClick={()=> {navigate(`../dashboard/${trip.id}/postTrip`)}}/>
      </Icons>
    </Card>
  )
}

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
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  position: relative;
`;
const Detail = styled.div`
  font-weight: 500;
  font-size: 2em;
  opacity: 0.9;
  font-style: italic;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  left: 50%;
`;
const Icons = styled.div`
  display: flex;
  gap: .8em;
  margin-right: 0.8em;
  margin-left: auto;
  align-items: center;
`
const OpenTrip = styled(FontAwesomeIcon)`
  color: #383838;
  font-size: 2em;
  cursor: pointer;
  z-index: 1;
  &:hover {
    filter: brightness(120%);
  }
`;
const DeleteTrip = styled(OpenTrip)`
  font-size: 1.7em;
  color: darkred;
`

const PostTrip = styled(OpenTrip)`
  font-size: 1.7em;
`
