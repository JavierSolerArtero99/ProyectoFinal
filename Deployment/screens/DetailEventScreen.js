import React from 'react';
import { View, Image, StyleSheet, Text, } from 'react-native';

export default class DetailEventScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { event } = this.props;
        console.log("===Se mostraran los detalles del evento:===")
        console.log(this.props.route.params.params.event);

        return (
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 15,
        backgroundColor: "#212121",
    },
});