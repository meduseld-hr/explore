import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

export default function StopDetails({stop}) {
  if(!stop) return <></>
  const {stop_name, greater_location} = stop;
  return (
    <Container>
      <Details>
        <Name>{stop_name}</Name>
        <Loc>{greater_location}</Loc>
      </Details>
      <Photos>
        photos here
      </Photos>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  border: 1px solid black;
  padding: .5em;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5em;
`
const Name = styled.h2`
  margin: 0;
`
const Loc = styled.div`
  font-style: italic;
`
const Photos = styled.div`
  display: flex;
`