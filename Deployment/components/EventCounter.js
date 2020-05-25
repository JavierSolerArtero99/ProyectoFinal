import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default class EventCounter extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { event } = this.props;

        return (
            <Text style={[{ color: event.color }, (event.todayChecked) ? (styles.counterDone) : (styles.counter)]}>{event.totalTimesDone} / {event.totalTimes}</Text>
        )
    }
}

const styles = StyleSheet.create({
    counter: {
        fontSize: 15,
        fontWeight: "bold",
    },
    counterDone: {
        textDecorationLine: "line-through",
        color: "#434343",
    }
});