import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, Alert, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';

import User from '../models/user';

import Credentials from '../components/SettingsComponents/Credentials';
import { updateUser, dropOutUser } from '../api/UsersDAO';

export default class Settings extends React.Component {

    /* STATE */
    state = {
        changingCredentials: false,
    }

    /* ASYNC METHODS */

    updateCredentials = async (newName, oldPass, newPass) => {
        if (oldPass == User._passwd) {
            await updateUser(User._id, newName, newPass)

            this.setState({
                changingCredentials: false,
            })

            ToastAndroid.showWithGravity(
                "User updated!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )

        } else {
            ToastAndroid.showWithGravity(
                "Incorrect password",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }

    dropOut = async () => {
        await dropOutUser(User._id)
        this.props.navigation.navigate("Login")
    }

    /* EVENTS */

    changeCredentials = () => {
        const { changingCredentials } = this.state;

        this.setState({
            changingCredentials: !changingCredentials,
        })
    }

    cancelChangingCredentials = () => {
        this.setState({
            changingCredentials: false,
        })
    }

    logOut = () => {
        User.logOut()
        this.props.navigation.navigate("Login")
    }

    render() {
        const { changingCredentials } = this.state;

        const logOutAlert = () =>
            Alert.alert(
                "Are you sure to Log Out?",
                "",
                [
                    { text: "OK", onPress: () => this.logOut() },
                    {
                        text: "Cancel",
                        style: styles.button
                    }
                ],
                { cancelable: true }
            );

        const dropOutAlert = () =>
            Alert.alert(
                "Are you sure to Drop Out?",
                "All your data will be removed",
                [
                    { text: "OK", onPress: () => this.dropOut() },
                    {
                        text: "Cancel",
                        style: styles.button
                    }
                ],
                { cancelable: true }
            );

        return (
            <ScrollView style={styles.container}>
                {/* IMAGE */}
                <View style={styles.imageContainer} >
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: "#545454" }}
                        source={require('../images/settings.png')}
                    />
                </View>

                {/* TITLE */}
                <Text style={styles.title}> Settings </Text>

                {/* CREDENTIALS */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#2380d1" }]}
                    onPress={this.changeCredentials}
                >
                    <View style={{ width: "90%" }}>
                        <Text style={styles.buttonText}>
                            Change Credentials
                        </Text>
                        {
                            (changingCredentials)
                            &&
                            (
                                <Credentials
                                    updateCredentials={this.updateCredentials}
                                    cancelChangingCredentials={this.cancelChangingCredentials}
                                />
                            )
                        }
                    </View>
                </TouchableOpacity>

                {/* LOG OUT */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#ef611e" }]}
                    // onPress={this.logOut}
                    onPress={logOutAlert}
                >
                    <Text style={styles.buttonText}>
                        Log Out
                    </Text>
                </TouchableOpacity>

                {/* DROP OUT */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#ff005a" }]}
                    onPress={dropOutAlert}
                >
                    <Text style={styles.buttonText}>
                        Drop Out
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 15,
        backgroundColor: "#212121",
    },
    imageContainer: {
        alignSelf: "center",
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "#545454",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 40,
        color: "#dbdbdb",
        marginBottom: 30,
    },
    button: {
        alignSelf: "center",
        paddingVertical: 20,
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#dbdbdb",
        alignSelf: "center",
    }
});