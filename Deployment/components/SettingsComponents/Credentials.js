import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import User from '../../models/user';

export default class Credentials extends React.Component {

    constructor(props) {
        super(props);
    }

    changeCredentials = () => {

    }

    cancelChangeCredentials = () => {
        this.props.cancelChangingCredentials();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={"New name"}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    placeholder={"Old Password"}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    placeholder={"New Password"}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#4ad869" }]}
                        onPress={this.changeCredentials}
                    >
                        <Text style={styles.buttonText}>Change</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#ff005a" }]}
                        onPress={this.cancelChangeCredentials}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#323232",
        borderRadius: 15,
    },
    textInput: {
        width: '80%',
        backgroundColor: "#545454",
        borderRadius: 10,
        marginVertical: 10,
        padding: 5,
        color: "#dbdbdb",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: "#dbdbdb",
        fontWeight: "bold"
    }
})