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

// TRIPS

pool.getSingleTripInfo = (tripId, userId) => {
  return pool
    .query(
      `
      SELECT t.id, t.trip_name, t.origin_google_place_id, t.thumbnail_url, t.completed, t.public
      FROM trips t
      INNER JOIN trips_users tu ON tu.trip_id = t.id
      WHERE t.id = $1 AND tu.user_id = $2
      `
      , [tripId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error getting single trip info `, err))
}

pool.getTrips = (userId) => {
  return pool
    .query(
      `
    SELECT t.id, t.trip_name, t.origin_google_place_id, t.thumbnail_url, t.completed, t.public
    FROM trips t
    INNER JOIN trips_users tu ON tu.trip_id = t.id
    WHERE tu.user_id = $1
  `,
      [userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error retrieving trips', err));
}

pool.searchTrips = (placeID) => {
  return pool
    .query(
      `
    SELECT t.id, t.trip_name, t.origin_google_place_id, t.thumbnail_url
    FROM trips AS t
    WHERE t.public = true AND t.origin_google_place_id = $1
  `,
      [placeID]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error retrieving trips', err));
}

pool.searchTripsByName = (tripName) => {
  console.log('searching DATABASE by ', tripName)
  return pool
    .query(
      `
    SELECT t.id, t.trip_name, t.origin_google_place_id, t.thumbnail_url
    FROM trips AS t
    WHERE t.trip_name LIKE $1 AND t.public = true;
  `,
    [tripName]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error retrieving trips', err));
}

pool.addTrip = ({ tripName, completed, public }, googlePlaceId, thumbnailUrl, userId) => {
  return pool
    .query(
      `
      INSERT INTO trips (trip_name, origin_google_place_id, thumbnail_url, completed, public)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `
      , [tripName, googlePlaceId, thumbnailUrl, completed, public]
  )
  .then((response) => {
    var tripId = response.rows[0].id;

    return pool
      .query(
        `
        INSERT INTO trips_users (trip_id, user_id, trip_owner, liked, added)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING trip_id
        `
        , [tripId, userId, true, true, true]
      )
      .then((response) => response.rows)
      .catch((err) => console.log(`Error adding trip `, err))
  })
  .catch((err) => console.log(`Error adding trip `, err))
}

pool.getPopularTrips = () => {
  return pool
    .query(
      `
      SELECT t.id, t.trip_name, t.origin_google_place_id, t.thumbnail_url, t.completed, t.public, COUNT(tu.liked) AS count
      FROM trips t
      INNER JOIN trips_users tu ON tu.trip_id = t.id
      WHERE tu.liked = true AND t.public = true
      GROUP BY t.id
      ORDER BY count DESC
      `
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error retrieving popular trips`, err))
}

pool.getRecentTrips = () => {
  return pool
    .query(
      `
      SELECT id, trip_name, origin_google_place_id, thumbnail_url, completed, public
      FROM trips
      WHERE public = true
      ORDER BY id DESC
      `
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error retrieving recent trips`, err))
}

pool.getRecommendedTrips = () => {
  return pool
    .query(
      `
      SELECT t.id, t.trip_name, t.origin_google_place_id, t.thumbnail_url, t.completed, t.public, COUNT(tu.added) AS count
      FROM trips t
      INNER JOIN trips_users tu ON tu.trip_id = t.id
      WHERE tu.added = true AND t.public = true
      GROUP BY t.id
      ORDER BY count DESC
      `
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error retrieving recommended trips`, err))
}

pool.deleteTrip = (tripId, userId) => {
  return pool
    .query(
      `
      SELECT t.id
      FROM trips t
      INNER JOIN trips_users tu ON tu.trip_id = t.id
      WHERE tu.user_id = $1 AND tu.trip_owner = true
      `
      , [userId]
    )
    .then((response) => {
      var authCheck = false;
      response.rows.forEach((trip) => {
        if (trip.id === tripId) {
          authCheck = true;
        }
      })
      if (authCheck) {
        return pool
          .query(
            `
            WITH
            tu AS (DELETE FROM trips_users
              WHERE trip_id = $1),
            m AS (DELETE FROM messages
              WHERE trip_id = $1),
            c AS (DELETE FROM comments
              WHERE trip_id = $1),
            s AS (DELETE FROM stops
              WHERE trip_id = $1)
            DELETE FROM trips
            WHERE id = $1
            `
            , [tripId]
          )
          .then((response) => response.rows)
          .catch((err) => console.log(`Error deleting trip: `, tripId, err))
      } else {
        return `Unauthorized user: ${userId} for Trip id: ${tripId}`;
      }
    })
    .catch((err) => console.log(`Error deleting trip: `, tripId, err))
}

pool.markTripCompleted = (tripId, userId) => {
  return pool
    .query(
      `
      UPDATE trips t
      SET complete = true
      FROM trips_users tu
      WHERE t.id = tu.trip_id AND t.id = $1 AND tu.user_Id = $2
      `
      , [tripId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error marking trip completed `, err))
}

pool.markTripIncomplete = (tripId, userId) => {
  return pool
    .query(
      `
      UPDATE trips t
      SET complete = false
      FROM trips_users tu
      WHERE t.id = tu.trip_id AND t.id = $1 AND tu.user_Id = $2
      `
      , [tripId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error marking trip incomplete `, err))
}

pool.changeTripName = (tripId, newTripName, userId) => {
  return pool
    .query(
      `
      UPDATE trips t
      SET trip_name = $1
      FROM trips_users tu
      WHERE t.id = tu.trip_id AND t.id = $2 AND tu.user_Id = $3
      `
      , [newTripName, tripId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error changing trip name `, err))
}

pool.changeTripOrigin = (tripId, { newOriginId, newThumbnailUrl }, userId) => {
  return pool
    .query(
      `
      UPDATE trips t
      SET origin_google_place_id = $1, thumbnail_url = $2
      FROM trips_users tu
      WHERE t.id = tu.trip_id AND t.id = $3 AND tu.user_Id = $4
      `
      , [newOriginId, newThumbnailUrl, tripId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error changing trip origin `, err))
}

pool.markTripPublic = (tripId, userId) => {
  return pool
    .query(
      `
      UPDATE trips t
      SET public = true
      FROM trips_users tu
      WHERE t.id = tu.trip_id AND t.id = $1 AND tu.user_Id = $2
      `
      , [tripId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error marking trip public `, err))
}

pool.markTripPrivate = (tripId, userId) => {
  return pool
    .query(
      `
      UPDATE trips t
      SET public = false
      FROM trips_users tu
      WHERE t.id = tu.trip_id AND t.id = $1 AND tu.user_Id = $2
      `
      , [tripId, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error marking trip private `, err))
}

// STOPS

pool.getStops = (tripId, userId) => {
  return pool
    .query(
      `
      SELECT s.id, s.stop_order, s.stop_name, s.trip_id, s.thumbnail_url, s.time_stamp, s.greater_location, s.google_place_id, s.latitude, s.longitude
      FROM stops s
      INNER JOIN trips_users tu ON tu.trip_id = s.trip_id
      WHERE tu.user_id = $1 AND s.trip_id = $2
      `
      , [userId, tripId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error receiving stops for trip: `, tripId, err))
}

pool.addStop = ({ stopOrder, stopName,  thumbnailUrl, timeStamp, greaterLocation, googlePlaceId, latitude, longitude }, userId, tripId) => {

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
            INSERT INTO stops (stop_order, stop_name, trip_id, thumbnail_url, time_stamp, greater_location, google_place_id, latitude, longitude)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `
            , [stopOrder, stopName, tripId, thumbnailUrl, timeStamp, greaterLocation, googlePlaceId, latitude, longitude]
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

pool.changeStopTime = (stopId, newTime, userId) => {
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

pool.decreaseStopOrder = (stopId, tripId, userId) => {
  return pool
    .query(
      `
      UPDATE stops s
      SET stop_order = stop_order - 1
      FROM trips_users tu
      WHERE s.trip_id = tu.trip_id AND s.id = $1 AND s.trip_id = $2 AND tu.user_Id = $3
      RETURNING stop_order
      `
      , [stopId, tripId, userId]
    )
    .then((response) => {
      var stopOrder = response.rows.stop_order
      return pool
        .query(
          `
          UPDATE stops s
          SET stop_order = stop_order + 1
          FROM trips_users tu
          WHERE s.trip_id = tu.trip_id AND s.id != $1 AND s.stop_order = $2 AND s.trip_id = $3 AND tu.user_Id = $4
          `
          , [stopId, stopOrder, tripId, userId]
        )
        .then((response) => response.rows)
        .catch((err) => console.log(`Error updating order for stops`, err))
    })
    .catch((err) => console.log(`Error updating order for stop: `, stopId, err))
}

pool.increaseStopOrder = (stopId, tripId, userId) => {
  return pool
    .query(
      `
      UPDATE stops s
      SET stop_order = stop_order + 1
      FROM trips_users tu
      WHERE s.trip_id = tu.trip_id AND s.id = $1 AND s.trip_id = $2 AND tu.user_Id = $3
      RETURNING stop_order
      `
      , [stopId, tripId, userId]
    )
    .then((response) => {
      var stopOrder = response.rows.stop_order
      return pool
        .query(
          `
          UPDATE stops s
          SET stop_order = stop_order - 1
          FROM trips_users tu
          WHERE s.trip_id = tu.trip_id AND s.id != $1 AND s.stop_order = $2 AND s.trip_id = $3 AND tu.user_Id = $4
          `
          , [stopId, stopOrder, tripId, userId]
        )
        .then((response) => response.rows)
        .catch((err) => console.log(`Error updating order for stops`, err))
    })
    .catch((err) => console.log(`Error updating order for stop: `, stopId, err))
}

// MESSAGES

pool.getMessages = (tripId) => {
  return pool
    .query(
      `
      SELECT body,
      (SELECT extract(epoch from time_stamp)) AS time_stamp,
      (SELECT nickname FROM users WHERE id = user_id) AS nickname,
      (SELECT picture FROM users WHERE id = user_id) AS picture
      FROM messages
      WHERE trip_id = $1
      `
      , [tripId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error getting messages for trip: `, err));
}

pool.addMessage = ({body, tripId, userId, timeStamp}) => {
  return pool
    .query(
      `
      INSERT INTO messages (body, trip_id, user_id, time_stamp)
      VALUES ($1, $2, $3, TO_TIMESTAMP($4))
      `
      , [body, tripId, userId, timeStamp]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error adding message to trip: `, err));
}

// USERS

pool.getUserInfo = (userId) => {
  return pool
    .query(
      `
    SELECT *
    FROM users
    WHERE id = $1
  `,
  [userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error retrieving trips', err));
}

pool.insertUser = (userId, nickname, picture, givenName) => {
  return pool
    .query(
      `
    INSERT INTO users (id, nickname, picture, given_name)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (id) DO NOTHING
    RETURNING nickname, picture
  `,
  [userId, nickname, picture, givenName]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error creating userInfo', err));
}

pool.updateUserName = (userId, updatedValue) => {
  return pool
    .query(
      `
      UPDATE users
      SET nickname = $1
      WHERE id = $2
      RETURNING nickname, picture
      `,
      [updatedValue, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error updating userInfo', err));
}

pool.updateUserPic = (userId, updatedValue) => {
  return pool
    .query(
      `
      UPDATE users
      SET picture = $1
      WHERE id = $2
      RETURNING nickname, picture
      `,
      [updatedValue, userId]
    )
    .then((response) => response.rows)
    .catch((err) => console.log('Error updating userInfo', err));
}

pool.searchUser = (searchTerm) => {
  return pool
    .query(
      `
      SELECT u.id, array_agg(tu.trip_id) AS trip_ids,  u.nickname, u.picture
      FROM users u
      INNER JOIN trips_users tu ON tu.user_id = u.id
      WHERE nickname ILIKE $1
      GROUP BY u.id
      `
      , [searchTerm + '%']
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error searching for users `, err))
}

// TRIPS/USERS

pool.addUserToTrip = (tripId, addedUserID, authUserId) => {
  return pool.getTrips(authUserId)
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
            INSERT INTO trips_users (trip_id, user_id, trip_owner, liked, added)
            VALUES ($1, $2, $3, $4, $5)
            `
            , [tripId, addedUserID, false, false, false]
          )
          .then((response) => response.rows)
          .catch((err) => console.log(`Error inserting user into user_trips `, err))
      } else {
        return `Unauthorized User: ${authUserId} for Trip id: ${tripId}`;
      }
    })
    .catch((err) => console.log(`Error retrieving trips`, err))
}

pool.getComments = (tripId) => {
  return pool
  .query(
    `
    SELECT body, photos,
    (SELECT extract(epoch from time_stamp)) AS time_stamp,
    (SELECT nickname FROM users WHERE id = user_id) AS nickname,
    (SELECT picture FROM users WHERE id = user_id) AS picture
    FROM comments
    WHERE trip_id = $1
    `
    , [tripId]
  )
  .then((response) => response.rows)
  .catch((err) => console.log(`Error getting comments for trip: `, err));
}

pool.addComment = ({body, tripId, userId, timeStamp}) => {
  return pool
    .query(
      `
      INSERT INTO comments (body, trip_id, user_id, time_stamp)
      VALUES ($1, $2, $3, TO_TIMESTAMP($4))
      `
      , [body, tripId, userId, timeStamp]
    )
    .then((response) => response.rows)
    .catch((err) => console.log(`Error adding comment to trip: `, err));
}


module.exports = pool;