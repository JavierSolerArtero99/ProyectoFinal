import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Timer extends React.Component {

    /**
     * elimina el timer actual
     */
    deleteThisTimer = () => {
        const { removeTimer, timer } = this.props;

        removeTimer(timer.id)
    }

    /* LAYOUT */
    render() {
        return (
            <View style={styles.timer}>
                <Text style={[styles.addTimerText, { color: this.props.color }]}>{this.props.timer.hour}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={this.deleteThisTimer}
                        style={styles.deleteTimerButton}
                    >
                        <MaterialCommunityIcons name="trash-can-outline" color={this.props.color} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timer: {
        marginTop: 5,
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
    deleteTimer: {
        fontSize: 15,
        fontWeight: "bold"
    }
});