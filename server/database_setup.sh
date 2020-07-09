#!/bin/sh

createdb eureka
psql eureka -c "CREATE TABLE posts ( id integer PRIMARY KEY, name VARCHAR(80), date_posted timestamp );"
