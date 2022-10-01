

CREATE TABLE users (
  id VARCHAR(10000) NOT NULL,
  nickname VARCHAR(100),
  picture VARCHAR(10000),
  given_name VARCHAR(100),

  PRIMARY KEY(id)
);

CREATE TABLE trips (
  id INT SERIAL,
  trip_name VARCHAR(1000) NOT NULL,
  origin_google_place_id VARCHAR(10000),
  thumbnail_url VARCHAR(10000),
  completed BOOLEAN,
  public BOOLEAN,

  PRIMARY KEY(id)

);

CREATE TABLE stops (
  id INT SERIAL,
  order INT,
  stop_name VARCHAR(1000),
  trip_id INT,
  thumbnail_url VARCHAR(10000),
  time_stamp TIMESTAMP,
  greater_location VARCHAR(1000),
  google_place_id VARCHAR(10000),

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id)
);

CREATE TABLE trips_users (
  id INT SERIAL,
  trip_id INT,
  user_id VARCHAR(10000),
  trip_owner BOOLEAN,
  liked BOOLEAN,
  added BOOLEAN,

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE messages (
  id INT SERIAL,
  body VARCHAR(10000),
  trip_id INT,
  user_id VARCHAR(10000),
  time_stamp TIMESTAMP,

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT SERIAL,
  body VARCHAR(10000),
  trip_id INT,
  user_id VARCHAR(10000),
  time_stamp TIMESTAMP,
  photos VARCHAR(10000)[],

  PRIMARY KEY(id),
  FOREIGN KEY(trip_id) REFERENCES trips(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);