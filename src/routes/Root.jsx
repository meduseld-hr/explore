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

  useEffect(() => {
    api
      .get('/profileInfo/info')
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <ThemeProvider theme={themes[theme]}>
      <UserContext.Provider value={user}>
        <App>
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
  /* overflow: auto; */
`;
const Header = styled.header`
  width: 100%;
  /* border: 1px solid; */
  display: flex;
  align-items: center;
  margin: 1em;
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
