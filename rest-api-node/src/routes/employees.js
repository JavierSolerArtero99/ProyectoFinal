const express = require('express');
const router = express.Router();

// importacion de la conexion
const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees;', (err, rows, fields) => {
        if(!err) {
            res.json(rows);

        } else {
            console.log("===ERROR===");
            console.log(err);
        }
    });
});

module.exports = router;