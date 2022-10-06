import { useState } from 'react';
import styled from 'styled-components';
import api from '../../functions/api';
import { useParams } from 'react-router-dom';

const AddUsersModal = ({ setAddingUsers }) => {

  const { tripId } = useParams();
  const [searchedUsers, setSearchedUsers] = useState([])

  const onChange = (e) => {
    e.preventDefault();

    if (e.target.value.length >= 1) {
      api.get(`/dashboard/search/${e.target.value}`)
          .then((response) => {
            setSearchedUsers(response.data)
          })
    } else {
      setSearchedUsers([])
    }
  }

  const addUser = (e) => {
    e.preventDefault();
    api.push(`/dashboard/${tripId}/addUser`)
  }

  return (
    <div>
      <GreyBackground onClick={() => {
        setAddingUsers(false);
      }} />
      <TopModal>
        <label htmlFor="usersSearch">Explorer Name: </label> <br />
        <input style={{width: '50%', margin: '0 auto', border: 'solid'}} type="search" name="usersSearch" onChange={onChange} />
        <br />
        {searchedUsers.map((user) => (
          <userProfile >
            <styledImg src={user.picture}></styledImg>
            <div>{user.nickname}</div>
            <addUserButton onClick={addUser}>Add User to trip</addUserButton>
          </userProfile>
        ))}
      </TopModal>
    </div>
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
height: 50%;
width: 90%;
overflow: auto;
background-color: white;
padding: 35px;
border-radius: 10px;
display: flex;
flex-direction: column;
text-align: center;
`;

const userProfile = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const addUserButton = styled.button`
  margin: auto;
  width: 33%;
  color: #020331fd;
  background-color: #4a81efc3;
  cursor: pointer;
`

const styledImg = styled.img`
  height: auto;
  width: auto;
`