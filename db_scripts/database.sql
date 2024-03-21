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
    func      VARCHAR(255),
    grid      boolean,
    x_label   VARCHAR(255),
    y_label   VARCHAR(255),
    width     INTEGER,
    height    INTEGER,
    p_script  VARCHAR(255),
    user_id   INTEGER ALLOW NULL,
    creation_date timestamp,

    invite_str VARCHAR(255),

    func3d      VARCHAR(255),
    z_range_l INTEGER,
    z_range_r INTEGER,
    z_label   VARCHAR(255),
    zeroaxis      boolean,
    color   VARCHAR(255),
    wigth   VARCHAR(255),
    points_type VARCHAR(255),
    plot_type VARCHAR(255),
    border boolean,
    z_tics    INTEGER,
    file_data VARCHAR(10000),
);

"create TABLE template_themes
(
    id        SERIAL PRIMARY KEY,
    name    VARCHAR(255),    
    by_invitation boolean,
    invitation_string VARCHAR(255),
);"

DELETE
FROM public.templates
DELETE
FROM public.users
DELETE
FROM public.template_themes
