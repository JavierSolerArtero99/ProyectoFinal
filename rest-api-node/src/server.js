const express = require('express');
const app = express();

/* SETTINGS:
definicion del servidor
*/

/**
 * coge el puerto disponible por el so
 * en caso contrario el 3000
 */
app.set('port', process.env.PORT || 3000); 

/* MIDDLEWARES:
funciones que se ejecutan antes de 
que se inicie el servidor */

/**
 * coge el formato json de express
 * para pasar los objetos
 */
app.use(express.json());

/* ROUTES:
parte de comunicacion cliente-servidor */

// ruta para los usuarios
app.use(require('./routes/users'));
// ruta para los eventos
app.use(require('./routes/events'));


/* START */
app.listen(app.get('port'), () => {
    console.log("===SERVER IN PORT:" + app.get('port') + "===");
});     