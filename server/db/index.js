const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

pool.getTrips = (userId) => {
  return pool
    .query(
      `
    SELECT t.id, t.trip_name, t.origin_google_place_id, t.completed, t.public
    FROM trips t
    INNER JOIN trips_users tu ON tu.trip_id = t.id
    WHERE tu.user_id = $1
  `,
      [userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error retrieving trips', err));
},

module.exports = pool;
