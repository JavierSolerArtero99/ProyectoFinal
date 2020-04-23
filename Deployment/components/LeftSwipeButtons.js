import React from 'react';
import { View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native';

/**
 * Componente funcional que devuelve el boton al
 * hacer swipe en un elemento de la lista  
 */
export default function LeftSwipeButton(props) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('left button clicked')}
        >
            <Image
                source={require('../icons/correct.png')}
                style={styles.checkButton}
            />
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
        backgroundColor: "#4ad869",
        aspectRatio: 1,
        flexDirection: 'column',
    },
    checkButton: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    }
});