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

// STOPS

pool.getStops = (tripId) => {
  return pool
    .query(
      `
      SELECT *
      FROM stops
      WHERE trip_id = $1
      `
      , [tripId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error receiving stops for trip: `, tripId, err))
}

pool.addStop = ({ stopOrder, stopName, tripId, thumbnailUrl, timeStamp, greaterLocation, googlePlaceId }) => {
  return pool
    .query(
      `
      INSERT INTO stops (stop_order, stop_name, trip_id, thumbnail_url, time_stamp, greater_location, google_place_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `
      , [stopOrder, stopName, tripId, thumbnailUrl, timeStamp, greaterLocation, googlePlaceId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error posting stop: `, stopName, err))
}

pool.deleteStop = (stopId) => {
  return pool
    .query(
      `
      DELETE FROM stops
      WHERE id = $1
      RETURNING *
      `
      , [stopId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error deleting stop: `, stopId, err))
}

pool.changeStopTime = ({ stopId, newTime }) => {
  return pool
    .query(
      `
      UPDATE stops
      SET time_stamp = $1
      WHERE id = $2
      `
      , [newTime, stopId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error updating timestamp for stop: `, stopId, err))
}


module.exports = pool;
