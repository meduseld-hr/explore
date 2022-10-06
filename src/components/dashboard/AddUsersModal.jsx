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
            console.log(response.data);
            setSearchedUsers(response.data)
          })
    } else {
      setSearchedUsers([])
    }
  }

  const addUser = (e) => {
    e.preventDefault();

    var addedUserId = e.target.title;

    api.push(`/dashboard/${tripId}/addUser`, { addedUserId })
    .then((response) => {
      setAddingUsers(false);
    })
    .catch((err) => {
      console.log(err);
    })
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
          <UserProfile key={user.id}>
            <StyledImg src={user.picture}></StyledImg>
            <div>{user.nickname}</div>
            {user.trip_ids.indexOf(parseInt(tripId)) !== -1 ? <div>Explorer is already on this trip</div> : <AddUserButton onClick={addUser} title={user.id}>Add User to trip</AddUserButton>}
          </UserProfile>
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

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 20%;
`

const AddUserButton = styled.button`
  height: 50%;
  width: 33%;
  color: #020331fd;
  background-color: #4a81efc3;
  cursor: pointer;
`

const StyledImg = styled.img`
  height: 100%;
  width: auto;
`