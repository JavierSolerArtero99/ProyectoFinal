CREATE DATABASE IF NOT EXISTS productiveapp;

USE productiveapp;

-- tabla de usuarios
CREATE TABLE IF NOT EXISTS users(
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    passwd VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

-- tabla de los eventos (habitos y check-in)
CREATE TABLE IF NOT EXISTS habits_n_checks(
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(50),
    icon VARCHAR(20) NOT NULL,
    event_type VARCHAR(10) NOT NULL,
    date VARCHAR(10) NOT NULL,
    end_date VARCHAR(10),
    color VARCHAR(10),
    hour VARCHAR(5),
    total_times INT(3) NOT NULL,
    total_times_today INT(3) DEFAULT 0,
    time INT(10) DEFAULT 0,
    is_runing BOOLEAN DEFAULT false,
	user INT(11),
    PRIMARY KEY(id),
    FOREIGN KEY(user) REFERENCES users(id) 
);