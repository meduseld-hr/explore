import { useContext } from "react"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import api from '../../functions/api';
import { UserContext } from '../../contexts/user';

export default function TripCard({ title = '', image = 'https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg', likes = 0 }) {
  const upperTitle = title.toUpperCase();
  const titleLetters = [];
  for (let i = 0; i < upperTitle.length; i++) {
    titleLetters.push(<span key={i}>{upperTitle[i]}</span>);
  }
  const user = useContext(UserContext);

  const toggleLike = () => {
    console.log('toggle like');

  };

  const copyTrip = () => {
    console.log('copy trip');
  };

  return (
    <Card>
      <Title>{titleLetters}</Title>
      <Info>
        <Image src={image} />
        <Stops>
          <Stop>Colloseum</Stop>
          <Stop>Pantheon</Stop>
          <Stop>Trevi Fountain</Stop>
          <Stop>Vatican Museums</Stop>
        </Stops>
        <Icons>
          <div>{likes}</div>
          <Heart icon={faHeart} onClick={() => {
            toggleLike();
          }} />
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
  height: 20em;
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
  display: flex;
  overflow: hidden;
  position: relative;
`
const Image = styled.img`
  object-fit: cover;
  -webkit-mask-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))
`
const Stops = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
`
const Stop = styled.div`
  font-size: 1.1em;
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
    icon: filledHeart;
  }
`
const Plus = styled(FontAwesomeIcon)`
  font-size: 2em;
  &:hover {
    color: gray;
  }
`