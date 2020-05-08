import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default class EventCounter extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { event } = this.props;

        return (
            <Text style={[styles.counter, { color: event.color }]}>{event.totalTimesDone} / {event.totalTimes}</Text>
        )
    }
}

const styles = StyleSheet.create({
    counter: {
        fontSize: 15,
        fontWeight: "bold",
    }
});