import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.button}>
                <Image
                    source={require('../icons/add.png')}
                    style={styles.addImage}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2380d1",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: 60,
        borderRadius: 50,
    },
    addImage: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    }
});
