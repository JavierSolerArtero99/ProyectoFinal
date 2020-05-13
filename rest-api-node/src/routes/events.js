const express = require('express');
const router = express.Router();

// importacion de la conexion
const mysqlConnection = require('../database');

// GET: de todos los eventos de un usuario en concreto
router.get('/events/:userId/', (req, res) => {
    const { userId } = req.params;

    mysqlConnection.query('SELECT * FROM productiveapp.habits_n_checks WHERE user = ?;', [userId], (err, rows, fields) => {
        if(!err) {
            res.json(rows);

        } else {
            console.log("===ERROR===");
            console.log(err);
        }
    });
});

module.exports = router;