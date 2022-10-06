import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import DarkmodeToggle from "./DarkModeToggle.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProfileInfo from "../profile/ProfileInfo.jsx";
import { UserContext } from "../../contexts/user.js";
import api from "../../functions/api.js";

export default function SideBar({ children }) {
  const { theme } = useOutletContext();
  const user = useContext(UserContext);
  const navigate = useNavigate()
  const [userPic, setUserPic] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    api
      .get(`/profileInfo/info`)
      .then((response) => {
        setUserPic(response.data[0].picture);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SideBarContainer>
      <Header>
        {theme === 'light'
          ? <Img
              src="/Logo_Light_v2.png"
              alt="Explore Logo"
              onClick={() => navigate('../trips')}
            />
          :
            <Img
              src="/Logo_Dark_v2.png"
              alt="Explore Logo"
              onClick={() => navigate('../trips')}
            />
        }
        <Profile src={userPic} onClick={() => { setOpenProfile(true) }}/>
        {openProfile && <ProfileInfo setOpenProfile={setOpenProfile}/>}
      </Header>
      <Container>{children}</Container>
      <EndContainer>
        <DarkmodeToggle />
      </EndContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.5em;
  padding: 1em;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
`;
const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const EndContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Profile = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 100%;
  border: 2px solid white;
  cursor: pointer;
  &:hover{
    filter: brightness(110%);
  }
`
const Img = styled.img`
  aspect-ratio: 1.77;
  width: 10em;
`;