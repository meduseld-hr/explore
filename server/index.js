const express = require('express')
const morgan = require('morgan')
const path = require('path');
const mountRoutes = require('./routes')
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');

//VARIABLE INITIALIZATION
const app = express();
const PORT = process.env.PORT || 3000;
mountRoutes(app);
const config = {
  authRequired: false,
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
const server = http.Server(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT']
  }
});

//MIDDLEWARE
app.use(express.static(path.join(__dirname, '../dist')));
app.use(morgan('dev'));
app.use(auth(config));

app.get('/api/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
});

io.on('connection', (socket) => {
  console.log('connected to dashboard');
  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  })
  socket.on('disconnect', () => {
    console.log('disconnected from dashboard');
    io.emit('leave', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});