import React from 'react';
import { View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Componente funcional que devuelve el boton al
 * hacer swipe hacia la derecha en un elemento de
 * la lista  
 */
export default function RightSwipeButtons(props) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: props.color }]}
            onPress={() => console.log('right button clicked')}
        >
            <MaterialCommunityIcons name="close" color={"#323232"} size={30} /> 
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