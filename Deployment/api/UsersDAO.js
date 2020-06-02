import User from "../models/user";
import { findAllByPK, deleteSelectedEvent } from "./EventsDAO";

/* ASYNCH METHODS */

/**
 * consulta el nombre y la contraseña del usuario pasado
 * por parametro
 * @param {*} name 
 * @param {*} passwd 
 */
export const loginUser = async (name, passwd) => {
    try {
        const user = await fetch(
            `http://192.168.0.106:3000/login/${name}/${passwd}`,
        );
        const loggedUser = await user.json();

        console.log("Usuario devuelto");
        console.log(loggedUser);

        return loggedUser[0];

    } catch (error) {
        console.error(error);
    }
}

export const signUser = async (name, passwd, dateString) => {
    console.log(dateString)
    try {
        console.log(name + " " + passwd)
        fetch(
            `http://192.168.0.106:3000/postUser/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                    name: name,
                    passwd: passwd,
                    date: dateString,
                })
            }
        );

        return loginUser(name, passwd)
        
    } catch (error) {
        console.error(error)
    }
}

export const updateUser = async (id, name, passwd) => {
    try {
        fetch(
            `http://192.168.0.106:3000/postUser/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    passwd: passwd,
                })
            }
        );

        User.modifyUser(name, passwd);

        return User
        
    } catch (error) {
        console.error(error)
    }
}

/**
 * elimina todos los datos del usuario referenciado pasado
 * por parametro
 * @param {*} userId 
 */
export const dropOutUser = async (userId) => {
    const userEvents = await findAllByPK(userId);

    userEvents.forEach(event => {
        deleteSelectedEvent(event.id);
    });

    try {
        fetch(
            `http://192.168.0.106:3000/deleteUser/`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                })
            }
        );
        
    } catch (error) {
        console.error(error)
    }
}

export const updatePerfectDay = async (userId) => {
    try {
        fetch(
            `http://192.168.0.106:3000/perfectDay/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                })
            }
        );
        
    } catch (error) {
        console.error(error)
    }
}

/* METODOS AUXILIARES */

/**
 * guarda el usuario logeado en un fichero
 */
export const saveUser = () => {
    try {

    } catch (error) {
    }
}