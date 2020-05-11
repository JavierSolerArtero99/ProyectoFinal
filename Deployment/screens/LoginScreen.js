import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends React.Component {

    /* LAYOUT */
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={{ width: 150, height: 150, borderRadius: 15 }}
                    source={require('../images/logo.png')}
                />

                <TextInput
                    style={[styles.textInput, {marginTop: 15,}]}
                    placeholder={"Name"}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={"Password"}
                    underlineColorAndroid="transparent"
                />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "#2380d1" }]}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "#ef611e" }]}>
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
        height: 40,
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
    },
    button: {
        marginRight: 15,
        marginLeft: 15,
        padding: 20,
        borderRadius: 15,
    },
    buttonText: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
    }
});