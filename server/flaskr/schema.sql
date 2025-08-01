DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS workout;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE workout (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    distance FLOAT, -- where distance is measured in kilometers
    duration FLOAT,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE tokenblocklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jti VARCHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX jti_index
ON tokenblocklist (jti);
