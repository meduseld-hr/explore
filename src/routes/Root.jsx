import styled, { ThemeProvider } from 'styled-components';
import themes from '../components/themes';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import api from '../functions/api';
import { UserContext } from '../contexts/user';
import ProfileInfo from '../components/profile/ProfileInfo.jsx';

export default function Root() {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    api
      .get('/profile')
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get(`/profileInfo/info`)
      .then((response) => {
        setUserPic(response.data[0].picture);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
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
                <img style={{height: "30px", width: "30px"}} src={userPic} onClick={() => { setOpenProfile(true) }} />
              ) : (
                <div></div>
              )}
              {openProfile ? <ProfileInfo setOpenProfile={setOpenProfile}/> : <div></div>}
            </Links>
          </Header>
          <Outlet context={{theme, setTheme}}/>
        </App>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

const App = styled.div`
  color: ${(props) => props.theme.color};
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  overflow: auto;
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
