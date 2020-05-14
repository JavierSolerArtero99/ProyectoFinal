export const loginUser = async (name, passwd) => {
    try {
        const user = await fetch(
            `http://192.168.0.108:3000/login/${name}/${passwd}`,
        );
        const loggedUser = await user.json();

        console.log("Usuario devuelto");
        console.log(loggedUser);

        return loggedUser[0];

    } catch (error) {
        console.error(error);
    }
}