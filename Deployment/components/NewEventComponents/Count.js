import React from 'react';

import { View, StyleSheet, Text, SafeAreaView, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Count extends React.Component {

    /* STATE && CONSTRUCTOR */

    state = {
    };

    constructor(props) {
        super(props)
    }

    /* LAYOUT */
    render() {
        const { totalTimes, color, updateTotalTimes, resetStopwatch } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>TIME COUNTER</Text>
                <TouchableOpacity
                    onPress={() => { 
                        updateTotalTimes('+');
                        resetStopwatch();
                    }}
                    style={styles.button}
                >
                    <Text style={[styles.totalTimes, { color: color }]}>+</Text>
                </TouchableOpacity>

                <Text style={[styles.counter, { color: "#dbdbdb" }]}>{totalTimes}</Text>

                <TouchableOpacity
                    onPress={() => { 
                        updateTotalTimes('-');
                        resetStopwatch();
                    }}
                    style={styles.button}
                >
                    <Text style={[styles.totalTimes, { color: color }]}>-</Text>
                </TouchableOpacity>
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
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#dbdbdb",
        marginBottom: 5,
    },
    totalTimes: {
        fontWeight: "bold",
        fontSize: 15,
    },
    counter: {
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 5,
    },
    button: {
        padding: 5,
        marginTop: 5,
        backgroundColor: "#434343",
        paddingHorizontal: 20,
        borderRadius: 15,
    }
});