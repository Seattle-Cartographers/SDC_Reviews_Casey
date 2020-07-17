
CREATE SCHEMA review;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  LocID TEXT UNIQUE,
  originCountry TEXT,
  originRegion TEXT,
  contributions INTEGER,
  name TEXT,
  profileImage TEXT
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  attractionId TEXT UNIQUE,
  attractionName TEXT,

);

CREATE TABLE reviews  (
  id SERIAL PRIMARY KEY,
  attractionId TEXT,
  attractionName TEXT,
  reviewNumber TEXT,
  rating INTEGER,
  travelType TEXT,
  expDate TEXT,
  lang TEXT,
  body TEXT,
  title TEXT,
  votes INTEGER,
  createdAt TEXT,
  helpful BOOLEAN
);

