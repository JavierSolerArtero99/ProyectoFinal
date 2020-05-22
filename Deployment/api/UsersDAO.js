import User from "../models/user";

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

export const signUser = async (name, passwd) => {
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
 * guarda el usuario logeado en un fichero
 */
export const saveUser = () => {
    try {

    } catch (error) {
    }
}