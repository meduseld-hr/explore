import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/user";
import Chat from '../components/dashboard/Chat.jsx';
import SideBar from "../components/dashboard/Sidebar.jsx"
import StagingArea from "../components/dashboard/StagingArea.jsx"

export default function Dashboard () {
  const user = useContext(UserContext);
  return (
    <DashContainer>
      <SideBar/>
      <StagingArea/>
      <Chat />
    </DashContainer>
  )
}

const DashContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  border: 2px solid black;
`