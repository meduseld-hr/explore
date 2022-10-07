

CREATE TABLE users (
  id VARCHAR(10000) NOT NULL,
  nickname VARCHAR(100),
  picture VARCHAR(10000),
  given_name VARCHAR(100),

  PRIMARY KEY(id)
);

CREATE INDEX users_id_idx ON users (id);

CREATE TABLE trips (
  id SERIAL,
  trip_name VARCHAR(1000) NOT NULL,
  origin_google_place_id VARCHAR(10000),
  thumbnail_url VARCHAR(10000),
  completed BOOLEAN,
  public BOOLEAN,
  likes INT,

  PRIMARY KEY(id)

);

CREATE TABLE stops (
  id SERIAL,
  stop_order INT,
  stop_name VARCHAR(1000),
  trip_id INT,
  thumbnail_url VARCHAR(10000),
  time_stamp TIMESTAMP,
  greater_location VARCHAR(1000),
  google_place_id VARCHAR(10000),
  latitude FLOAT,
  longitude FLOAT,

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id)
);

CREATE INDEX stops_trip_id_idx ON stops (trip_id);

CREATE TABLE trips_users (
  id SERIAL,
  trip_id INT,
  user_id VARCHAR(10000),
  trip_owner BOOLEAN,
  liked BOOLEAN,
  added BOOLEAN,

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX trips_users_trip_id_idx ON trips_users (trip_id);
CREATE INDEX trips_users_user_id_idx ON trips_users (user_id);

CREATE TABLE messages (
  id SERIAL,
  body VARCHAR(10000),
  trip_id INT,
  user_id VARCHAR(10000),
  time_stamp TIMESTAMP,

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX messages_trip_id_idx ON messages (trip_id);

CREATE TABLE comments (
  id SERIAL,
  body VARCHAR(10000),
  trip_id INT,
  user_id VARCHAR(10000),
  time_stamp TIMESTAMP,
  photos VARCHAR(10000)[],

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX comments_trip_id_idx ON comments (trip_id);