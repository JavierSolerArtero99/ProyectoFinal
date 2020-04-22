import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

export default class AddEventButton extends React.Component {
    /* CONSTRUCTOR */
    constructor(props) {
        super(props);
    }

    /* LAYOUT */
    render() {
        const { addEvents } = this.props;

        return (
            <TouchableOpacity style={styles.button} onPress={addEvents}>
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