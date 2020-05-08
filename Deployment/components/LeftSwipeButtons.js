import React from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Componente funcional que devuelve el boton al
 * hacer swipe en un elemento de la lista  
 */
export default function LeftSwipeButton(props) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: props.color }]}
            onPress={() => {props.addTotalTimeCounter(props.event, props.event.totalTimes)}}
        >
            <MaterialCommunityIcons name="check" color={"#323232"} size={30} /> 
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
    checkButton: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    }
});