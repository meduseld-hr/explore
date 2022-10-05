import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function TripSidebarCard({ id }) {
  const navigate = useNavigate();

  return (
    <Card>
      <Thumbnail src="https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg" />
      <Detail>
        <div>Name here</div>
        <div>Location here</div>
        <div>Other information</div>
      </Detail>
      <OpenTrip icon={faPlay} onClick={() => navigate(`../dashboard/${id}/details`)}/>
    </Card>
  );
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
  background-color: #f0f0f0;
  position: relative;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  left: 50%;
`;
const OpenTrip = styled(FontAwesomeIcon)`
  color: #383838;
  font-size: 2em;
  margin-right: 0.5em;
  margin-left: auto;
  cursor: pointer;
  z-index: 1;
`;
