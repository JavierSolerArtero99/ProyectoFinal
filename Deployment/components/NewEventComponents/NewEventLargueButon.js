import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NewEventLargueButton(props) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: props.color }]}>
                <Text style={styles.buttonText}>ADD {props.eventType}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft: 15,
        marginRight: 15,
    },
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