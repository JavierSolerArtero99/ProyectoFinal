import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { millisecondsToHuman } from '../utils/stopwatchUtils';

export default class EventStopWatch extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { event } = this.props;

        return (
            <Text style={[styles.stopwatchTimer, {color: event.color}]}>
                {millisecondsToHuman(event.time)}
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