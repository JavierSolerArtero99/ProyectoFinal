import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, Alert } from 'react-native';
import User from '../models/user';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Settings extends React.Component {

    /* STATE */
    state = {

    }

    /* EVENTS */

    changeCredentials = () => {

    }

    logOut = () => {

    }

    dropOut = () => {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                <TouchableHighlight
                    style={[styles.button, { backgroundColor: "#2380d1" }]}
                    onPress={this.changeCredentials}
                >
                    <Text style={styles.buttonText}>
                        Change Credentials
                    </Text>
                </TouchableHighlight>
                {/* LOG OUT */}
                <TouchableHighlight
                    style={[styles.button, { backgroundColor: "#ef611e" }]}
                    onPress={this.logOut}
                >
                    <Text style={styles.buttonText}>
                        Log Out
                    </Text>
                </TouchableHighlight>
                {/* DROP OUT */}
                <TouchableHighlight
                    style={[styles.button, { backgroundColor: "#ff005a" }]}
                    onPress={this.dropOut}
                >
                    <Text style={styles.buttonText}>
                        Drop Out
                    </Text>
                </TouchableHighlight>
            </SafeAreaView>
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
        alignItems: "center",
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "#545454",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#dbdbdb",
        marginBottom: 30,
    },
    button: {
        padding: 20,
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#dbdbdb"
    }
});