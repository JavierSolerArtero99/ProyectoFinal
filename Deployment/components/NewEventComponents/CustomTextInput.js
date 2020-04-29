import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

/**
 * Componente reciclable con un text input personalizado 
 * @param {*} props 
 */
export default class CustomTextInput extends React.Component {

    /* STATE */
    state = {
        name: "",
    }

    /**
     * envia el nuevo nombre de evento al componente
     * padre
     */
    sendName = text => {
        const { changeName } = this.props;
        const { name } = this.state;

        this.setState({
            name: text
        });

        changeName(name);
    }

    /* LAYOUT */
    render() {
        const { name } = this.state;
        return (
            <TextInput
                onChangeText={this.sendName}
                style={[styles.textInput]}
                placeholder={this.props.placeholder}
                underlineColorAndroid="transparent"
                value={name}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#323232",
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: 15,
        color: "#dbdbdb",
        fontWeight: "bold",
    }
});