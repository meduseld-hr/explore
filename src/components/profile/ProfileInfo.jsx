import TripTiles from "./TripTiles.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user";
import styled from 'styled-components';
import api from '../../functions/api';

const dummyDataTripsUsers = {
  results: [
    {
      "id": 1,
      "trip_name": "Going to Madrid",
      "ThumbnailURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLOPKXq9Izs3dns9rgXXeRy5Jlmhiho-hAdg&usqp=CAU"
    },
    {
      "id": 2,
      "trip_name": "On My Way to California",
      "ThumbnailURL": "https://picsum.photos/200"
    },
    {
      "id": 3,
      "trip_name": "Brazil Here I Come!",
      "ThumbnailURL": "https://picsum.photos/200"
    }
  ]
}



export default function ProfileInfo({setOpenProfile}) {
  const trips = dummyDataTripsUsers.results;
  const user = useContext(UserContext);
  let [editInProgress, setEditInProgress] = useState(false);
  let [profilePic, setProfilePic] = useState(user.picture);
  let [username, setUsername] = useState(user.nickname);

  useEffect(()=>{
    api.get(`/profileInfo/info`)
      .then((response)=>{
        let pic = response.data[0].picture
        let nickname = response.data[0].nickname
        setProfilePic(pic);
        setUsername(nickname);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const onSubmit = (e, field) => {
    e.preventDefault();
    // console.log('target is -->', e);
    // console.log(e.target.form[0].value, 'is the changeValue')
    // console.log(field, 'is the field')
    let changeValue = e.target.form[0].value;
    if (field === "nickname") {
      api.patch(`/profileInfo/updateNickname`, {
        "nickname": changeValue
      })
        .then((response)=> {
          setUsername(response.data)
        })
        .catch((err)=> {
          console.log(err);
        })

    } else if (field === "picture") {
      api.patch(`/profileInfo/updateProfilePic`, {
        "picture": changeValue
      })
      .then((response)=> {
        setProfilePic(response.data)
      })
      .catch((err)=> {
        console.log(err);
      })
    }
  }

  return (
    <div>
    <GreyBackground onClick={()=> {setOpenProfile(false)}}/>
    <TopModal>
      <RowContainer>
        <img
          style={{ height: "10vw", width: "10vw" }}
          src={profilePic}
          alt="profile pic"
        />
        <p>Username: {username}</p>
      </RowContainer>
      <button onClick={() => { setEditInProgress(true) }}>Update Profile</button>
      {editInProgress ?
        <EditProfileModal onSubmit={onSubmit} setEditInProgress={setEditInProgress} />
        : <div></div>}
      {trips.map((trip) => {
        return (<TripTiles key={trip.id} trip={trip} />)
      })}
    </TopModal>

    </div>
  )
}

const RowContainer = styled.div`
  display: "flex";
  flex-direction: "row";
`

const GreyBackground = styled.div`
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 100;
  cursor: pointer;
`;

const TopModal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 101;
width: 80vw;
height: 70vh;
overflow: auto;
background-color: white;
padding: 10px;
`;