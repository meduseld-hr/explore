import TripTiles from "./TripTiles.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user";
import styled from 'styled-components';
import api from '../../functions/api';


export default function ProfileInfo({setOpenProfile}) {
  const user = useContext(UserContext);
  let [editInProgress, setEditInProgress] = useState(false);
  let [profilePic, setProfilePic] = useState("https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png");
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
        console.log(err);
      })
  }, [])

  const onSubmit = (e, field) => {
    e.preventDefault();
    let changeValue = e.target.form[0].value;
    if (changeValue.length > 0){
      if (field === "nickname") {
        api.patch(`/profileInfo/updateNickname`, {
          "nickname": changeValue
        })
          .then((response)=> {
            setUsername(response.data.nickname);
            setEditInProgress(false);
          })
          .catch((err)=> {
            console.log(err);
          })

      } else if (field === "picture") {
        api.patch(`/profileInfo/updateProfilePic`, {
          "picture": changeValue
        })
        .then((response)=> {
          setProfilePic(response.data.picture);
          setEditInProgress(false);
        })
        .catch((err)=> {
          console.log(err);
        })
      }
    }
  }

  return (
    <div>
    <GreyBackground onClick={()=> {setOpenProfile(false)}}/>
    <TopModal>

      {editInProgress ?
        <EditProfileModal onSubmit={onSubmit} setEditInProgress={setEditInProgress} />
        : <div style={{paddingTop: "30px"}}><RowContainer>
        <Image

          src={profilePic}
          alt="profile pic"
        />
        <p><b>{username} </b></p>
      </RowContainer>
      <Button onClick={() => { setEditInProgress(true) }}>Update Profile</Button></div>}
    </TopModal>

    </div>
  )
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Image = styled.img`
  height: 10vw;
  width: 10vw;
  border-radius: 10px;
  margin: 10px;
  object-fit: cover;
  object-position: 50% top;
`;

const Button = styled.button`
  padding: 5px;
  margin: 10px;
  color: #020331fd;
  border-radius: 20px;
  background-color: #4a81efc3;
`;

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
width: 35vw;
height: 45vh;
overflow: auto;
background-color: white;
padding: 35px;
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
`;