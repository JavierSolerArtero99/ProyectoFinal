import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

/**
 * Componente reciclable con un text input personalizado 
 * @param {*} props 
 */
export default function CustomTextInput(props) {
    return (
        <TextInput
            style={[styles.textInput]}
            placeholder={props.placeholder}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#323232",
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: 15,
        color: "#dbdbdb",
        fontWeight: "bold",
    }
});