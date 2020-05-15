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

            console.log(rows)

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
                        is_runing: rows[0].is_runing,
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
                                    is_runing: row.is_runing,
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

module.exports = router;