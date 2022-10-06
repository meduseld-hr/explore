import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import api from '../../functions/api';

export default function TripCard({ id, title = '', image = 'https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg' }) {
  const upperTitle = title.toUpperCase();
  const titleLetters = [];
  for (let i = 0; i < upperTitle.length; i++) {
    titleLetters.push(<span key={i}>{upperTitle[i]}</span>);
  }
  const [stops, setStops] = useState([]);

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
          <Icon icon={faHeart} />
          <Icon icon={faPlus} />
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
  flex: 1;
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
const Icon = styled(FontAwesomeIcon)`
  font-size: 2em;
  &:hover{
    filter: brightness(120%);
  }
`