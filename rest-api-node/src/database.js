const mysql = require('mysql');

// conexion con los parametros necesarios
const con = mysql.createConnection({
    host: 'localhost', //donde esta la base de datos
    user: 'root',   //usuario cion el que se va a conectar
    password: 'password',    //contraseña de este
    database: 'company' //base de datos a la que se quiere conectar
});

// lanzando la conexion
con.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("-DB CONNECTION SUCCESFULL-");
    }
});

module.exports = con;