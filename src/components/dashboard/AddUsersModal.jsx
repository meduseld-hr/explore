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

    var addedUserId = e.target.title;

    api.post(`/dashboard/${tripId}/addUser`, { addedUserId })
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
            <StyledName >{user.nickname}</StyledName>
            {user.trip_ids.indexOf(parseInt(tripId)) !== -1 ? <StyledName>Explorer is already on this trip</StyledName> : <AddUserButton onClick={addUser} title={user.id}>Add User to trip</AddUserButton>}
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
background-color: ${(props) => props.theme.background};
border: 1px solid ${(props) => props.theme.border};
padding: 35px;
border-radius: 10px;
display: flex;
flex-direction: column;
text-align: center;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  height: 20%;
  margin: auto;
`

const AddUserButton = styled.button`
  height: 50%;
  width: 33%;
  color: #020331fd;
  background-color: #4a81efc3;
  border-radius: 12px;
  margin-left: auto;
  margin: auto;
  cursor: pointer;
`

const StyledImg = styled.img`
  height: 100%;
  width: auto;
  border-radius: 12px;
`

const StyledName = styled.div`
  margin-left: 5%;
  margin: auto;

`
