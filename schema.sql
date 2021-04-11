DROP DATABASE IF EXISTS addeemployeeDB;
CREATE DATABASE addeemployeeDB;
​
USE addeemployeeDB;
​
CREATE TABLE department(
    id INT PRIMARY KEY,
    name VARCHAR(100) NULL,
);

CREATE TABLE roles(
  
);

CREATE TABLE employee(
  
);
​
INSERT INTO songs (id, artist, song, song_year, raw_total, raw_usa, raw_uk, raw_eur, raw_row)
VALUES (1,"Bing Crosby","White Christmas",1942,39.903,23.929,5.7,2.185,0.54
);
​
SELECT * FROM songs