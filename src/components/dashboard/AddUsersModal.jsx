import React from 'react';
import styled from 'styled-components';

const AddUsersModal = ({setAddingUsers}) => {

  return (
    <GreyBackground onClick={() => {
      setAddingUsers(false);
    }}>
      <TopModal>
        hello
      </TopModal>
    </GreyBackground>
  )

};

export default AddUsersModal;

const GreyBackground = styled.div`
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  cursor: pointer;
`;

const TopModal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 101;
overflow: auto;
background-color: white;
padding: 35px;
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
`;