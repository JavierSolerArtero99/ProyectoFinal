import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loginUser, signUser } from '../api/UsersDAO';
import User from '../models/user';

export default class LoginScreen extends React.Component {

    /* STATE */
    state = {
        isLogged: (User._isLogged),
        name: "",
        passwd: "",
    }

    /* EVENTOS */

    changeName = (newName) => {
        this.setState({
            name: newName,
        })
    }

    changePasswd = (newPasswd) => {
        this.setState({
            passwd: newPasswd,
        })
    }

    /* ASYNC METHODS */

    /**
     * llama a la peticion get de la api para comprobar
     * un usuario y ver si se puede logear
     */
    logIn = async () => {
        const { name, passwd } = this.state;
        let user;

        if (name.length > 0 && passwd.length > 0) {
            user = await loginUser(name, passwd);

            if (user == undefined) {
                (ToastAndroid.showWithGravity(
                    "Name or Password incorrect!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                ));
            } else {
                User.buildUser(user);
                this.props.navigation.navigate("Main")
            }
        } else {
            ToastAndroid.showWithGravity(
                "Enter a name and password",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    /**
     * metodo para poder inscribirse
     */
    signIn = async () => {
        const { name, passwd } = this.state;
        let user;

        if (name.length > 0 && passwd.length > 0) {
            user = await signUser(name, passwd);
            if (user == undefined) {
                (ToastAndroid.showWithGravity(
                    "Name or Password incorrect!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                ));

            } else {
                User.buildUser(user);
                this.props.navigation.navigate("Main")
            }

        } else {
            ToastAndroid.showWithGravity(
                "Enter a name and password",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    /* LAYOUT */
    render() {
        const { isLogged } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={{ width: 150, height: 150, borderRadius: 100, backgroundColor: "#545454" }}
                    source={require('../images/logo.png')}
                />

                <TextInput
                    style={[styles.textInput, { marginTop: 15, }]}
                    placeholder={"Name"}
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeName}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={"Password"}
                    underlineColorAndroid="transparent"
                    onChangeText={this.changePasswd}
                />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#2380d1" }]}
                        onPress={this.logIn}
                    >
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#ef611e" }]}
                        onPress={this.signIn}
                    >
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#212121",
    },
    imageContainer: {
        width: 5,
        height: 5,
    },
    textInput: {
        width: '87%',
        backgroundColor: "#323232",
        marginBottom: 15,
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        color: "#dbdbdb",
        fontWeight: "bold",
    },
    buttonsContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    button: {
        marginRight: 15,
        marginLeft: 15,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 15,
    },
    buttonText: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
    }
});