import explorer from '/Logo_Light_v2.png';
import { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  let [destination, setDestination] = useState('')
  const navigate = useNavigate();

  // const onChange = (e) => {
  //   e.preventDefault();
  //   setDestination(e.target.value);
  // }

  const onClick = () => {
    console.log(`I am going to ${destination}`);
    //make axios request for recommended trips by "destination"
    //redirect to page for trips
    navigate(`../trips`)
  }
  return (
    <Cont>
      <ColCont>
        <LOGOTop src={explorer} />
        <TopModal>
          <p>Travel to Live.</p>
          <p>Live to Travel.</p>
          <p>Travel to meet yourself.</p>
          <p>Travel with excellence.</p>
          <br></br>
          {/*<label htmlFor="destinationSearch">Where would you like to go next:</label> <br />
          <input style={{width: '50%', margin: '0 auto'}} type="search" name="destinationSearch" onChange={onChange} /> */}
          <br />
          <Button onClick={onClick}>Start Your Adventure</Button>
        </TopModal>
      </ColCont>
    </Cont>
  )
}

const Cont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10% auto auto auto;
`

const ColCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Button = styled.button`
  padding: 5px;
  width: 15em;
  color: ${(props) => {props.theme.color}};
  background-color: ${(props) => {props.theme.background}};
`;

const LOGOTop = styled.img`
  width: 250px; aspect-ratio: 1.77;
  margin-bottom: 2em;
`;

const TopModal = styled(ColCont)`
  font: 3em "Balthazar", sans-serif;
  line-height: .1em;
  height: 100%;
  width: 100%;
  border-radius: 1.5em;
  padding: 1em;
  color: #f1f0fb;
  background-color: rgba(0, 0, 0, 0.75);
`;