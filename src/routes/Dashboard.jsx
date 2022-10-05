import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/user";
import SideBar from "../components/dashboard/Sidebar.jsx"
import StagingArea from "../components/dashboard/StagingArea.jsx"

export default function Dashboard () {
  const user = useContext(UserContext);
  return (
    <DashContainer>
      <SideBar>
        <div>Hello world</div>
        </SideBar>
      <StagingArea/>
    </DashContainer>
  )
}

const DashContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  border: 2px solid black;
`