import React from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Componente funcional que devuelve el boton al
 * hacer swipe en un elemento de la lista  
 */
export default function LeftSwipeStopwatchButton(props) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: props.color }]}
            onPress={() => {props.startStopCounter(props.event.id)}}
        >
            <MaterialCommunityIcons name={props.icon} color={"#323232"} size={30} /> 
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
});