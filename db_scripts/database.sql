create TABLE users
(
    id       SERIAL PRIMARY KEY,
    login    VARCHAR(255),
    password VARCHAR(255)
);

create TABLE templates
(
    id       SERIAL PRIMARY KEY,
    title    VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);