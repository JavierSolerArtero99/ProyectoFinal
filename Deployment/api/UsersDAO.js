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

/**
 * guarda el usuario logeado en un fichero
 */
export const saveUser = () => {
    try {

    } catch (error) {
    }
}