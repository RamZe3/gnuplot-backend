create TABLE users
(
    id       SERIAL PRIMARY KEY,
    login    VARCHAR(255),
    email    VARCHAR(255),
    password VARCHAR(255)
);

create TABLE templates
(
    id        SERIAL PRIMARY KEY,
    title     VARCHAR(255),
    x_range_l INTEGER,
    x_range_r INTEGER,
    y_range_l INTEGER,
    y_range_r INTEGER,
    x_tics    INTEGER,
    y_tics    INTEGER,
    func      VARCHAR(255)[],
    grid      boolean,
    p_script  VARCHAR(255),
    user_id   INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

{
    "title": "TestNew",
    "x_range_l": -15,
    "x_range_r": 15,
    "y_range_l": -75,
    "y_range_r": 75,
    "func": ["tan(pi * x)", "cos(x)"],
    "user_id": 3
}