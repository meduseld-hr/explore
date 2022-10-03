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
}

pool.addTrip = ({}, userId) => {
  return pool
    .query(
    `

    `
  )
}

// STOPS

pool.getStops = (tripId, userId) => {
  return pool
    .query(
      `
      SELECT *
      FROM stops s
      INNER JOIN trips_users tu ON tu.trip_id = s.trip_id
      WHERE tu.user_id = $1 AND s.trip_id = $2
      `
      , [userId, tripId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error receiving stops for trip: `, tripId, err))
}

pool.addStop = ({ stopOrder, stopName, tripId, thumbnailUrl, timeStamp, greaterLocation, googlePlaceId }, userId) => {

  return pool.getTrips(userId)
    .then((response) => {
      var authCheck = false;
      response.forEach((trip) => {
        if (trip.id === tripId) {
          authCheck = true;
        }
      })
      if (authCheck) {
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
      } else {
        return `Unauthorized User: ${userId} for Trip id: ${tripId}`;
      }
    })
    .catch(err => console.log('Error getting trips for adding a stop', err))

}

pool.deleteStop = (stopId, userId) => {
  return pool
    .query(
      `
      DELETE FROM stops s
      USING trips_users tu
      WHERE s.trip_id = tu.trip_id AND s.id = $1 AND tu.user_id = $2
      `
      , [stopId, userId]
    )
    .then((response) => response)
    .catch((err) => console.log(`Error deleting stop: `, stopId, err))
}

pool.changeStopTime = ({ stopId, newTime }, userId) => {
  return pool
    .query(
      `
      UPDATE stops s
      SET time_stamp = $1
      FROM trips_users tu
      WHERE s.trip_id = tu.trip_id AND s.id = $2 AND tu.user_Id = $3
      `
      , [newTime, stopId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error updating timestamp for stop: `, stopId, err))
}

pool.changeStopOrder = ({ stopId, tripId, newOrder }, userId) => {
  return pool
    .query(
      `
      UPDATE stops s
      SET stop_order = stop_order + 1
      FROM trips_users tu
      WHERE s.trip_id = tu.trip_id AND s.trip_id = $2 AND tu.user_Id = $3 AND s.stop_order >= $1
      `
      , [newOrder, tripId, userId]
    )
    .then((response) => {
      return pool
        .query(
        `
        UPDATE stops s
        SET stop_order = $1
        FROM trips_users tu
        WHERE s.trip_id = tu.trip_id AND s.id = $2 AND tu.user_Id = $3
        `
        , [newOrder, stopId, userId]
      )
      .then((response) => response.rows)
      .catch((err) => console.log(`Error updating order for stop: `, stopId, err))
    })
    .catch((err) => console.log(`Error updating order for stop: `, stopId, err))
}



module.exports = pool;
