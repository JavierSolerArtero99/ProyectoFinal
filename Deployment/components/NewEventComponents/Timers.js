import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import TimePicker from './TimePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Timers(props) {

    /* LAYOUT */
    return (
        <View style={styles.timerContainer}>
            {(props.timers.length >= 0) && (
                props.timers.map((timer) => {
                    return (
                        <Text style={[styles.addTimerText, { color: props.color }]}>{timer}</Text>
                    );
                })
            )}
            <TouchableOpacity style={styles.addTimerButton}>
                <Text style={[styles.addTimerText, { color: props.color }]}>+ Add a timer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        borderRadius: 15,
        marginTop: 15,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: "#323232",
    },
    addTimerButton: {
        marginTop: 15,
    },
    addTimerText: {
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 5,
    }
});