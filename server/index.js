const express = require('express')
const morgan = require('morgan')
const path = require('path');
const mountRoutes = require('./routes')
require('dotenv').config();

//VARIABLE INITIALIZATION
const app = express();
const PORT = process.env.port || 3000;
mountRoutes(app);

//MIDDLEWARE
app.use(express.static(path.join(__dirname, '../dist')))
app.use(morgan('dev'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})