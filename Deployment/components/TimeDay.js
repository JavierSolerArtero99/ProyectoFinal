import React from 'react';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';

import getDayTimeImage from '../utils/getDayTimeImage'
import EventListItem from './EventListItem'

export default class TimeDay extends React.Component {
    constructor(props) {
        super(props)
    }

    renderTimeEvents(events) {
        return (
            <View style={styles.eventsList}>
                <FlatList
                    data={events}
                    renderItem={({ item }) => this.renderListItem(item)}
                />
            </View>
        );
    }

    renderListItem(event) {
        return (
            <EventListItem event={event}/>
        )
    }

    render() {
        const { time, events } = this.props;

        return (
            <View style={styles.timeContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={getDayTimeImage(time)}
                        style={styles.image}
                    />
                </View>
                <View style={styles.eventsContainer}>
                    {this.renderTimeEvents(events)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timeContainer: {
        marginTop: 15,
        flex: 1,
    },
    imageContainer: {
        height: 100,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    eventsContainer: {
        backgroundColor: "#323232",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        paddingTop: 10,
        paddingHorizontal: 5,
    },
    eventsList: {
        marginLeft: 3,
    },
});
