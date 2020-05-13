export default class User {
    static _id = "";
    static _name = "";
    static _passwd = "";

    static buildUser = (loggedUser) => {
        User._id = loggedUser.id;
        User._name = loggedUser.name;
        User._passwd = loggedUser.passwd;
    }
}