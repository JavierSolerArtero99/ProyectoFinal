export default class User {
    static _id = "";
    static _name = "";
    static _passwd = "";
    static _isLogged = false;

    static buildUser = (loggedUser) => {
        User._id = loggedUser.id;
        User._name = loggedUser.name;
        User._passwd = loggedUser.passwd;
        User._isLogged = true;
    }

    static modifyUser = (name, passwd) => {
        User._name = name;
        User._passwd = passwd;
        User._isLogged = true;
    }

    static logOut = () => {
        User._id = "";
        User._name = "";
        User._passwd = "";
        User._isLogged = false;
    }
}