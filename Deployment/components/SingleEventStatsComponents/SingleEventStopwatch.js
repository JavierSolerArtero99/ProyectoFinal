import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';

import { Audio } from 'expo-av';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { millisecondsToHuman } from '../../utils/stopwatchUtils';

export default class SingleEventStopWatch extends React.Component {

    // state = {
    //     finished: false,
    // }

    // constructor(props) {
    //     super(props)
    // }

    // finish = () => {
    //     const { finished } = this.state;
    //     const { event, addTotalTimeCounter } = this.props;

    //     if (!finished) {
    //         this.playSound();

    //         addTotalTimeCounter(event, 1);

    //         this.setState({
    //             finished: true,
    //         })
    //     }

    //     return "00:00:00"
    // }

    // playSound = async () => {
    //     const soundObject = new Audio.Sound();

    //     if (Audio.getPermissionsAsync()) {
    //         try {
    //             await soundObject.loadAsync(require('../../sounds/notification.mp3'));
    //             await soundObject.playAsync();

    //         } catch (error) {
    //         }
    //     } else {
    //         console.log("no hay permisos")
    //     }
    // }

    render() {
        const { event, time, startStopCounter } = this.props;
        const timeString = millisecondsToHuman(time);

        return (
            <View style={styles.stopwatchContainer}>
                {/* <TouchableOpacity
                    style={[styles.stopwatchButton, {backgroundColor: event.color}]}
                    onPress={startStopCounter}
                >
                    <MaterialCommunityIcons name={"play"} color={"#323232"} size={40} />
                </TouchableOpacity> */}
                <Text style={[{ color: event.color }, styles.stopwatchTimer]}>
                    {(time > 1000) ? (timeString) : (this.finish())}
                </Text>
                {/* <TouchableOpacity
                    style={[styles.stopwatchButton, {backgroundColor: event.color}]}
                >
                    <MaterialCommunityIcons name={"restart"} color={"#323232"} size={40} />
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stopwatchContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    stopwatchTimer: {
        fontSize: 25,
        fontWeight: "bold",
        marginHorizontal: 20,
        marginBottom: 15,
    },
    stopwatchButton: {
        borderRadius: 50,
        padding: 5,
        marginVertical: 10,
    },
    stopwatchTimerDone: {
        fontSize: 25,
        textDecorationLine: "line-through",
        color: "#434343",
    }
});