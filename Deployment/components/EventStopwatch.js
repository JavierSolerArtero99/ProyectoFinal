import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Audio } from 'expo-av';
import { millisecondsToHuman } from '../utils/stopwatchUtils';

export default class EventStopWatch extends React.Component {

    state = {
        finished: false,
    }

    constructor(props) {
        super(props)
    }

    finish = () => {
        const { finished } = this.state;
        const { event, addTotalTimeCounter } = this.props;

        if (!finished) {
            this.playSound();

            addTotalTimeCounter(event, 1);

            this.setState({
                finished: true,
            })
        }

        return "00:00:00"
    }

    playSound = async () => {
        const soundObject = new Audio.Sound();

        if (Audio.getPermissionsAsync()) {
            try {
                await soundObject.loadAsync(require('../sounds/notification.mp3'));
                await soundObject.playAsync();

            } catch (error) {
            }
        } else {
            console.log("no hay permisos")
        }
    }

    render() {
        const { event, time } = this.props;
        const timeString = millisecondsToHuman(time);

        return (
            <Text style={[styles.stopwatchTimer, { color: event.color }]}>
                {(time > 1000) ? (timeString) : (this.finish())}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    stopwatchTimer: {
        fontSize: 15,
        fontWeight: "bold",
    }
});