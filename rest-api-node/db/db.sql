CREATE DATABASE IF NOT EXISTS productiveapp;

USE productiveapp;

--TABLAS

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
    defaultTime INT(10) DEFAULT '0';
    is_runing BOOLEAN DEFAULT false,
	user INT(11),
    PRIMARY KEY(id),
    FOREIGN KEY(user) REFERENCES users(id) 
);

-- tabla para los recordatorios de cada habito
CREATE TABLE IF NOT EXISTS habits_reminders(
	id INT(11) NOT NULL AUTO_INCREMENT,
    hour VARCHAR(8) NOT NULL,
    habit INT(11) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(habit) REFERENCES habits_n_checks(id) 
);

--PROCEDURES

--addEvent
CREATE DEFINER=`root`@`localhost` PROCEDURE `addEvent`(
	IN _id INT(11),
	IN _name VARCHAR(20),
    IN _description VARCHAR(50),
    IN _icon VARCHAR(20),
    IN _event_type VARCHAR(10),
    IN _date VARCHAR(10),
    IN _end_date VARCHAR(10),
    IN _color VARCHAR(10),
    IN _hour VARCHAR(5),
    IN _total_times INT(3),
    IN _total_times_today INT(3),
    IN _time INT(10),
	IN _is_runing tinyint(1),
    IN _user INT(11)    
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO habits_n_checks(name, description, icon, event_type, date, end_date, color, hour, total_times, total_times_today, time, is_runing, user)
        VALUES (_name, _description, _icon, _event_type, _date, _end_date, _color, _hour, _total_times, _total_times_today, _time, _is_runing, _user);
		SET _id = last_insert_id();
	ELSE
		UPDATE habits_n_checks
        SET 
			name = _name, 
            description = _description,
            icon = _icon, 
            event_type = _event_type, 
            date = _date, 
            end_date = _end_date, 
            color = _color, 
            hour = _hour, 
            total_times = _total_times, 
            total_times_today = _total_times_today, 
            time = _time, 
            is_runing = _is_runing
            WHERE id = _id;
	END IF;
END

--addReminder
CREATE DEFINER=`root`@`localhost` PROCEDURE `addReminder`(
	IN _hour VARCHAR(5),
    IN _habit_id INT(11)
)
BEGIN
	DELETE FROM habits_reminders WHERE habit=_habit_id;
	INSERT INTO habits_reminders(hour, habit)
    VALUES(_hour, _habit_id);
END

--addUser
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser`(
	IN _id INT,
    IN _name VARCHAR(45),
    IN _passwd VARCHAR(20)
)
BEGIN 
	IF _id = 0 THEN
		INSERT INTO users(name, passwd)
        VALUES (_name, _passwd);
		SET _id = last_insert_id();
	ELSE
		UPDATE users
        SET 
			name = _name,
            passwd = _passwd
            WHERE id = _id;
	END IF;
    
    SELECT _id AS id;
END