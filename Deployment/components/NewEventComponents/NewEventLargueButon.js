import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NewEventLargueButton(props) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: props.color}]}>
            <Text style={styles.buttonText}>ADD {props.eventType}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: '100%',
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    buttonText: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
    }
});