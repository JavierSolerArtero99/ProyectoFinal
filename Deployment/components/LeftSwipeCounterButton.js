import React from 'react';
import { StyleSheet, TouchableOpacity, Text, } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function LeftSwipeCounterButton(props) {
    console.log("propiedades");
    console.log(props);

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: props.color }]}
            onPress={() => console.log('left button clicked')}
        >
            <Text
                style={styles.counter}
                color={props.event.color}
            >
                {props.count}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        flexDirection: 'column',
    },
    counter: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#323232",
    }
});