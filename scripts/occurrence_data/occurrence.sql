CREATE TABLE occurrence (
id SERIAL PRIMARY KEY,
species_name varchar(255),
geom    geometry,
geom_type       varchar(40),
accuracy        varchar(40),
source  varchar(255)
);
