

CREATE DATABASE beerdata;

CREATE TABLE glasses(
    glass_id SERIAL PRIMARY KEY,
    glass_name VARCHAR(255),
)

CREATE TABLE beers(
    beer_id SERIAL PRIMARY KEY,
    beer_name VARCHAR,
    beer_style_id FOREIGN KEY,
)

CREATE TABLE styles(
    style_id SERIAL PRIMARY KEY,
    style_name VARCHAR(255),
    beer_glass_id FOREIGN KEY
)