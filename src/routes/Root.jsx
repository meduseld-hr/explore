import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import api from '../functions/api';
import { UserContext } from '../contexts/user';
import ProfileInfo from '../components/profile/ProfileInfo.jsx';

export default function Root() {
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    api
      .get('/profile')
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <App>
        <Header>
          <H2>Explore {user && <span>for {user.name}</span>}</H2>
          <Links>
            <Link to={'dashboard'}>Dashboard</Link>
            {/* <Link to={'profile'}>Profile</Link> */}
            <Link to={'landing'}>Landing</Link>
            <Link to={'trips'}>Trips</Link>

            {user ? (
              <a href={`${window.location.origin}/api/logout?redirect_uri=${window.location.origin}`}>Logout</a>
            ) : (
              <a href={`${window.location.origin}/api/login?redirect_uri=${window.location.origin}`}>Login</a>
            )}
            {user ? (
              <img src={user.picture} onClick={() => { setOpenProfile(true) }} />
            ) : (
              <div></div>
            )}
            {openProfile ? <ProfileInfo setOpenProfile={setOpenProfile}/> : <div></div>}
          </Links>
        </Header>
        <Outlet />
      </App>
    </UserContext.Provider>
  );
}

const App = styled.div`
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
`;
