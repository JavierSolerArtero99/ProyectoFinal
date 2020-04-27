import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EventTypeButton(props) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: props.color }]}
            onPress={props.onPress}
        >
            <Text style={styles.textButton}>{props.buttonName}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        marginRight: 10,
        marginLeft: 10,
        padding: 30,
        borderRadius: 15,
        height: 80,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    textButton: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 18,
    },
});