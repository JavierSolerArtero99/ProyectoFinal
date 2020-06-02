export default class User {
    static _id = "";
    static _name = "";
    static _passwd = "";
    static _isLogged = false;

    static buildUser = (loggedUser) => {
        User._id = loggedUser.id;
        User._name = loggedUser.name;
        User._passwd = loggedUser.passwd;
        User._date = loggedUser.date;
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

    static getFormatedDate = (date) => {
        let beginArray = date.split("-")

        beginArray[1] = (parseInt(beginArray[1]) + 1) + "";
        console.log("ARRAY");
        console.log(beginArray[0]);
        
        (beginArray[0].length == 1) && (beginArray[0] = "0" + beginArray[0]);
        (beginArray[1].length == 1) && (beginArray[1] = "0" + beginArray[1]);

        console.log("Array formated");
        console.log(beginArray[0])

        return (beginArray[0] + "-" + beginArray[1] + "-" + beginArray[2]);
    }
}