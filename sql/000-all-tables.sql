CREATE TABLE users (
  id CHARACTER(20) PRIMARY KEY,
  username CHARACTER(20) UNIQUE,
  api_token CHARACTER(40) UNIQUE,
  status CHARACTER(20), -- active, inactive
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE urls (
  id CHARACTER(20) PRIMARY KEY,
  destination TEXT,
  short CHARACTER(20),
  user CHARACTER(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

  -- a url belongs to a user
  FOREIGN KEY (user) REFERENCES users(id) 
);
