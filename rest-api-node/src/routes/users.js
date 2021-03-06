const express = require('express');
const router = express.Router();

// importacion de la conexion
const mysqlConnection = require('../database');

// GET: obtiene un usuario con las credenciales que correspondan
router.get('/login/:name/:passwd', (req, res) => {
    const { name, passwd } = req.params;

    mysqlConnection.query('SELECT * FROM users WHERE name = ? AND passwd = ?;', [name, passwd], (err, rows, fields) => {
        if (!err) {
            res.json(rows);

        } else {
            console.log("===ERROR===");
            console.log(err);
        }
    });
});

// POST: sube un nuevo user
router.post('/postUser/', (req, res) => {
    const { id, name, passwd, date } = req.body;
    const query = `CALL addUser(?, ?, ?, ?);`;

    mysqlConnection.query(query, [id, name, passwd, date], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'User Added' });
        } else {
            console.log(err);
        }
    });
});

router.post('/perfectDay/', (req, res) => {
    const { body } = req;
    const perfectDay = "UPDATE users SET perfect_days = perfect_days + 1 WHERE id = ?";

    mysqlConnection.query(
        perfectDay,
        [body.userId],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: "Event DONE" });
            } else {
                console.error(err);
            }
        }
    );
});

// PUT: modifica un usuario
router.put('/updateUser/:id', (req, res) => {
    const { name, passwd } = req.body;
    const { id } = req.params;
    const query = "CALL addUser(?, ?, ?)";

    mysqlConnection.query(query, [id, name, passwd], (err, rows, fields) => {
        if (!err) {
            res.json({ status: "User Updated" });
        } else {
            console.log(err);
        }
    });
})

// DELETE: elimina al usuario
router.delete('/deleteUser/', (req, res) => {
    const { userId } = req.body;
    const query = "DELETE FROM users WHERE id=?;";

    mysqlConnection.query(
        query,
        [userId],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: "User Droped Out" });
            } else {
                console.log(err);
            }
        });
})


module.exports = router;