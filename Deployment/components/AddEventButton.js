import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AddEventButton extends React.Component {
    /* CONSTRUCTOR */
    constructor(props) {
        super(props);
    }

    /**
     * Cambia a la screen de añadir un
     * nuevo evento
     */
    newEvent = () => {
        const { addEvents, navigation } = this.props;
        navigation.navigate("AddEvent", { params: { navigation, addEvents } })
    }

    /* LAYOUT */
    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.newEvent}>
                <MaterialCommunityIcons name="plus" color={"#323232"} size={30} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#14ffec",
        marginLeft: '20%',
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        borderRadius: 50,
    },
});
