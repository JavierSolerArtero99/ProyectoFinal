import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Timer extends React.Component {

    deleteThisTimer = () => {
        const { removeTimer, timer } = this.props;

        removeTimer(timer.id)
    }

    render() {

        return (
            <View style={styles.timer}>
                <Text style={[styles.addTimerText, { color: this.props.color }]}>{this.props.timer.hour}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={this.deleteThisTimer}
                        style={styles.deleteTimerButton}
                    >
                        <Text style={[styles.deleteTimer, { color: this.props.color }]}>X</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    timer: {
        alignItems: "center",
        flexDirection: "row",
    },
    addTimerText: {
        fontWeight: "bold",
        fontSize: 15,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    deleteTimerButton: {
        borderRadius: 50,
        height: 25,
        width: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#545454",
    },
});