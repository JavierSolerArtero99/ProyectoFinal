import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Main from '../../screens/Main';

export default class SingleEventCounter extends React.Component {

    // constructor(props) {
    //     super(props)
    // }

    // update = () => {
    //     const { event, addTotalTimeCounter } = this.props;
    //     addTotalTimeCounter(event, (1))
    // }

    render() {
        const { event } = this.props;
        return (
            <View style={styles.counterContainer}>
                {/* + 1
                <TouchableOpacity
                    onPress={() => { Main.addTotalTimeCounter(event, (1)) }}
                    style={[styles.counterButton, { backgroundColor: event.color }]}
                >
                    <Text style={styles.addCount}>+1</Text>
                </TouchableOpacity> */}

                {/* texto */}
                <Text style={[{ color: event.color }, styles.counter]}>{event.totalTimesDone} / {event.totalTimes}</Text>

                {/* -1
                <TouchableOpacity
                    onPress={() => { addTotalTimeCounter(event, (-1)) }}
                    style={[styles.counterButton, { backgroundColor: event.color }]}
                >
                    <Text style={styles.addCount}>-1</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    counter: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 25,
        fontWeight: "bold",
    },
    counterContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    counterButton: {
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        padding: 5,
        marginVertical: 10,
    },
    addCount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#434343"
    },
});