const express = require('express');
const router = express.Router();

// importacion de la conexion
const mysqlConnection = require('../database');

/* FUNCIONES AUXILIARES */

/**
 * metodo para ver si en el array pasado por parametro
 * hay un evento con el mismo id pasado por el segundo
 * parametro
 * @param {*} containerArray array con todos los eventos para comprobar
 * @param {*} idToSearch id para buscar en el array
 */
const contains = (containerArray, idToSearch) => {
    let contain = false;
    let index = 0;

    containerArray.forEach(element => {
        if (element.id == idToSearch && !contain) {
            index = idToSearch
        }
    });

    return index
}

/* ROUTES */

// GET: de todos los eventos de un usuario en concreto
router.get('/events/:userId/', (req, res) => {
    const { userId } = req.params;

    mysqlConnection.query(
        'SELECT habits_n_checks.*, habits_reminders.id as reminderId, habits_reminders.hour as reminderHour, habits_reminders.habit as habitId FROM productiveapp.habits_n_checks INNER JOIN habits_reminders ON habits_n_checks.id = habits_reminders.habit WHERE habits_n_checks.user = ?;',
        [userId],
        (err, rows, fields) => {
            if (!err) {
                let aux = [];
                if (rows.length > 0) {
                    aux.push({
                        id: rows[0].id,
                        name: rows[0].name,
                        description: rows[0].description,
                        hour: rows[0].hour,
                        icon: rows[0].icon,
                        event_type: rows[0].event_type,
                        date: rows[0].date,
                        end_date: rows[0].end_date,
                        color: rows[0].color,
                        total_times: rows[0].total_times,
                        total_times_today: rows[0].total_times_today,
                        time: rows[0].time,
                        defaultTime: rows[0].defaultTime,
                        is_runing: rows[0].is_runing,
                        todayChecked: (rows[0].today_checked > 0),
                        totalTimesChecked: rows[0].total_times_checked,
                        actualStreak: rows[0].actual_streak,
                        bestStreak: rows[0].best_streak,
                        timers: [{
                            id: rows[0].reminderId,
                            hour: rows[0].reminderHour,
                        }]
                    });

                    rows.forEach((row, index) => {
                        if (index > 0) {
                            let containId = contains(aux, row.id)

                            if (containId == 0) {
                                aux.push({
                                    id: row.id,
                                    name: row.name,
                                    description: row.description,
                                    icon: row.icon,
                                    hour: row.hour,
                                    event_type: row.event_type,
                                    date: row.date,
                                    end_date: row.end_date,
                                    color: row.color,
                                    total_times: row.total_times,
                                    total_times_today: row.total_times_today,
                                    time: row.time,
                                    defaultTime: row.defaultTime,
                                    is_runing: row.is_runing,
                                    todayChecked: (row.today_checked > 0),
                                    totalTimesChecked: row.total_times_checked,
                                    actualStreak: row.actual_streak,
                                    bestStreak: row.best_streak,
                                    timers: [{
                                        id: row.reminderId,
                                        hour: row.reminderHour,
                                    }]
                                });

                            } else {
                                aux.forEach(element => {
                                    if (element.id == containId) {
                                        element.timers.push(
                                            {
                                                id: row.reminderId,
                                                hour: row.reminderHour
                                            })
                                    }
                                });
                            }
                        }
                    });
                }

                res.json(aux);
            } else {
                console.log("===ERROR===");
                console.log(err);
            }
        });
});

// GET: de la ultima id del evento introducido
router.get('/lastEvent/', (req, res) => {
    const query = "SELECT id FROM productiveapp.habits_n_checks order by id desc limit 1;"

    mysqlConnection.query(
        query,
        (err, rows, fields) => {
            if (!err) {
                res.json(rows)

            } else {
                console.log(err)
            }
        })
})

router.get('/bestSreak/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT perfect_days FROM productiveapp.users WHERE id = ?;"

    mysqlConnection.query(
        query,
        [id],
        (err, rows, fields) => {
            if (!err) {
                res.json(rows)

            } else {
                console.log(err)
            }
        }
    )
})

// POST: crea o modifica un evento en concreto
router.post('/updateEvent/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const query = "CALL addEvent(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const lastReminder = "SELECT id FROM productiveapp.habits_n_checks where user = ? order by id desc LIMIT 1;"; // WHERE ENABLED == TRUE
    const remindersQuery = "CALL addReminder(?, ?)"
    let last = 0;

    console.log(body.name + ": " + body.totalTimesDone)

    mysqlConnection.query(
        query,
        [id, body.name, body.description, body.icon, body.eventType, body.date, body.endDate, body.color, body.hour, body.totalTimes, body.totalTimesDone, body.time, body.isRuning, body.isChecked, body.userId],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: "Event modified" });

                mysqlConnection.query(
                    lastReminder,
                    [body.userId],
                    (err, rows, fields) => {

                        if (!err) {
                            last = rows[0].id
                            body.timers.forEach(timer => {

                                mysqlConnection.query(
                                    remindersQuery,
                                    [timer.hour, last],
                                    (err, rows, fields) => {
                                        if (err) {
                                            console.error(err)
                                        }
                                    }
                                );
                            });
                        } else {
                            console.log(err)
                        }
                    }
                );
            } else {
                console.error(err);
            }
        }
    );
})

// POST: pone el evento pasado por parametro a hecho
router.post('/doneEvent/', (req, res) => {
    const { body } = req;
    const query = "UPDATE habits_n_checks SET today_checked = 1, total_times_checked = total_times_checked + 1, actual_streak = ?, best_streak = ? WHERE id = ?";
    let last = 0;

    mysqlConnection.query(
        query,
        [body.actualStreak, body.bestStreak, body.id],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: "Event DONE" });
            } else {
                console.error(err);
            }
        }
    );
})

// DELETE: elimina el evento
router.delete('/deleteEvent/:id', (req, res) => {
    const { id } = req.params;
    const deleteReminders = "DELETE FROM habits_reminders WHERE habit = ?";
    const deleteEvents = "DELETE FROM habits_n_checks WHERE id = ?";

    mysqlConnection.query(
        deleteReminders,
        [id],
        (err, rows, fields) => {
            if (!err) {
                mysqlConnection.query(
                    deleteEvents,
                    [id],
                    (err, rows, fields) => {
                        if (!err) {
                            console.log("Deleted: " + id)
                        } else {
                            console.log(err);
                        }
                    }
                )
            } else {
                console.error(err)
            }
        }
    )
})

module.exports = router;