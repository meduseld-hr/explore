import logo from '/408006.webp';
import explorer from '/Logo_Light_v2.png';
import { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
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
  return <div>
    <LOGOBackground src={logo} />
    <LOGOTop src={explorer} />
    <TopModal>
      <i>Travel to live.</i>
      <br />
      <i>Live to travel.</i>
      <br />
      <i>Travel to meet yourself.</i>
      <br />
      <i>Travel with excellence.</i>
      <br /><br />
      <label htmlFor="destinationSearch">Where would you like to go next:</label> <br />
      <input style={{width: '50%', margin: '0 auto'}} type="search" name="destinationSearch" onChange={onChange} />
      <br />
      <Button onClick={onClick}>Start Your Adventure</Button>
    </TopModal>
  </div>
}

const Button = styled.button`
  padding: 5px;
  margin: auto;
  width: 33%;
  color: #020331fd;
  background-color: #4a81efc3;

`;

const LOGOBackground = styled.img`
  position: fixed;
  top: 0; left: 0;
  width: auto; height: auto;
  z-index: -1;
`;

const LOGOTop = styled.img`
  position: fixed;
  top: 10%; left: 50%;
  transform: translate(-50%, -10%);
  width: 250px; height: 150px;
  z-index: 5;
`;

const TopModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 40vw;
  height: 50%;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  color: #f1f0fb;
  background-color: #07051bc9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;