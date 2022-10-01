const express = require('express')
const morgan = require('morgan')
const path = require('path');
const mountRoutes = require('./routes')
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

//VARIABLE INITIALIZATION
const app = express();
const PORT = process.env.PORT || 3000;
const config = {
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000/',
  clientID: 'hxh4xcfvQpA7NtAlm0bm1DgkQbeyDyAn',
  issuerBaseURL: 'https://dev-1mdmd8kt.us.auth0.com',
  routes: {
    login: '/api/login',
    logout: '/api/logout',
  }
};

//MIDDLEWARE
app.use(express.static(path.join(__dirname, '../dist')));
app.use(morgan('dev'));
//ANY ROUTES WITHOUT AUTH


//ROUTES WITH AUTH
app.use(auth(config));
mountRoutes(app);

app.get('/api/profile', (req, res) => {
  console.log(req.oidc.user);
  res.send(JSON.stringify(req.oidc.user))
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});