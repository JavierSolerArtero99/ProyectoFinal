import React from 'react';

import { View, StyleSheet, Text, SafeAreaView, } from 'react-native';

export default class Stopwatch extends React.Component {

    /* STATE && CONSTRUCTOR */

    state = {

    };

    constructor(props) {
        super(props)
    }

    /* LAYOUT */
    render() {
        return (
            <View style={styles.container}>
                <Text></Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginTop: 15,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: "#323232",
    }
});