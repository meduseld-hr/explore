import { useContext, useEffect, useState } from "react"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import api from '../../functions/api';
import { UserContext } from '../../contexts/user';

export default function TripCard({ id, title = '', image = 'https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg', likes = 0 }) {
  const upperTitle = title.toUpperCase();
  const titleLetters = [];
  for (let i = 0; i < upperTitle.length; i++) {
    titleLetters.push(<span key={i}>{upperTitle[i]}</span>);
  }
  const user = useContext(UserContext);
  const [stops, setStops] = useState([]);
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);

  const toggleLike = () => {
    console.log('toggle like');

  };

  const copyTrip = () => {
    console.log('copy trip');
  };

  useEffect(() => {
    api.get(`/dashboard/${id}`)
      .then((response) => {
        setStops(response.data[0].sort((a, b) => (a.stop_order - b.stop_order)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id])

  return (
    <Card>
      <Title>{titleLetters}</Title>
      <Info>
        <Image src={image} />
        <Stops>
          {stops.map(stop => <Stop key={stop.id}>{stop.stop_name}</Stop>)}
        </Stops>
        <Icons>
          <span>{likes}</span>
          {liked
            ? <Heart icon={hover ? faHeart : filledHeart} onMouseOver={() => {
                setHover(true);
              }} onMouseOut={() => {
                setHover(false);
              }} onClick={() => {
                toggleLike();
              }} />
            : <Heart icon={hover ? filledHeart : faHeart} onMouseOver={() => {
                setHover(true);
              }} onMouseOut={() => {
                setHover(false);
              }} onClick={() => {
                toggleLike();
              }} />
          }
          <Plus icon={faPlus} onClick={() => {
            copyTrip();
          }}/>
        </Icons>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  height: 18em;
  width: 24%;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
`;
const Title = styled.div`
  font-size: 1.7em;
  display: flex;
  justify-content: space-between;
  padding: 0em 1em;
  user-select: none;
`;
const Info = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  -webkit-mask-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,1)), to(rgba(0,0,0,.5)))
`
const Stops = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
`
const Stop = styled.div`
  font-size: 0.8em;
  font-style: italic;
`
const Icons = styled.div`
  display: flex;
  position: absolute;
  right: .2em;
  bottom: .2em;
  gap: .5em;
`
const Heart = styled(FontAwesomeIcon)`
  font-size: 2em;
  color: red;
  &:hover {
    cursor: pointer;
  }
`
const Plus = styled(FontAwesomeIcon)`
  font-size: 2em;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`