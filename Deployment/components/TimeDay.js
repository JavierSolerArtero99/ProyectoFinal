import React from 'react';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';

import getDayTimeImage from '../utils/getDayTimeImage'
import EventListItem from './EventListItem'

export default class TimeDay extends React.Component {
    /* CONSTRUCTOR */
    constructor(props) {
        super(props)
    }

    /* LAYOUT */
    render() {
        const {
            events,
            moment,
            navigation,
            addTotalTimeCounter,
            startStopCounter,
            restartCounter,
            editEvent,
            deleteEvent } = this.props;

        return (
            (events.length > 0) ?
                (
                    <View style={styles.timeContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={getDayTimeImage(moment)}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.eventsContainer}>
                            {events.map((event) => {
                                return (
                                    <View style={styles.eventsList}>
                                        <EventListItem
                                            addTotalTimeCounter={addTotalTimeCounter}
                                            event={event}
                                            time={event.time}
                                            navigation={navigation}
                                            startStopCounter={startStopCounter}
                                            restartCounter={restartCounter}
                                            editEvent={editEvent}
                                            deleteEvent={deleteEvent}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                ) : (
                    <View></View>
                )
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
