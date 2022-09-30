import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <App>
      <Header>
        <H2>Explore</H2>
        <Links>
          <Link to={'planner'}>Planner</Link>
          <Link to={'profile'}>Profile</Link>
          <Link to={'places'}>Places</Link>
        </Links>
      </Header>
      <Outlet/>
    </App>
  );
}

const App = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;
const Header = styled.header`
  width: 100%;
  border: 1px solid;
  display: flex;
  align-items: center;
`;
const Links = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1em;
  margin-right: 1em;
`;
const H2 = styled.h2`
  margin: 0;
`
