import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../functions/api';

export default function Root() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/profile')
    .then((response) => {
      setUser(response.data)
      console.log(response.data);
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <App>
      <Header>
        <H2>Explore</H2>
        <Links>
          <Link to={'planner'}>Planner</Link>
          <Link to={'profile'}>Profile</Link>
          <Link to={'places'}>Places</Link>
          <Link>Login</Link>
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
