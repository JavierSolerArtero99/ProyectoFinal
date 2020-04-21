import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import WeekHeader from '../components/WeekHeader';
import AddEventButton from '../components/AddEventButton';
import EmptyDay from '../components/EmptyDay';
import TimeDay from '../components/TimeDay';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    name: "Saltar a la comba",
                    icon: "",
                    color: "red",
                    totalTimes: 3,
                    time: 0,
                    repeat: "daily",
                    hour: "10:00",
                },
                {
                    name: "Comer",
                    icon: "",
                    color: "red",
                    totalTimes: 3,
                    time: 0,
                    repeat: "daily",
                    hour: "10:00",
                },
                {
                    name: "Ir a misa",
                    icon: "",
                    color: "red",
                    totalTimes: 3,
                    time: 0,
                    repeat: "daily",
                    hour: "15:00",
                },
                {
                    name: "Recorrer el missisipi",
                    icon: "",
                    color: "red",
                    totalTimes: 3,
                    time: 0,
                    repeat: "daily",
                    hour: "21:00",
                }
            ]
        }
    }

    renderEvents() {
        const { events } = this.state;

        if (events.length == 0) {
            return (
                <EmptyDay />
            );
        } else {
            { return (this.renderDayEvents(events)) }
        }
    }

    renderDayEvents(events) {
        let morning = [];
        let afternoon = [];
        let night = [];

        events.forEach(event => {
            let hour = parseInt(event.hour.charAt(0) + event.hour.charAt(1));
            switch (true) {
                case ((hour >= 6) && (hour < 12)):
                    morning.push(event)
                    break;
                case ((hour >= 12) && (hour < 19)):
                    afternoon.push(event)
                    break;
                case ((hour >= 19)):
                    night.push(event)
                    break;
            }
        });

        return (
            <View style={styles.dayContainer}>
                {this.renderTime(morning, "morning")}
                {this.renderTime(afternoon, "afternoon")}
                {this.renderTime(night, "night")}
            </View>
        )
    }

    renderTime(timeEvents, time) {
        if (timeEvents.length > 0) {
            return (
                <TimeDay time={time} events={timeEvents} />
            );
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.staticHeader}>
                    <WeekHeader />
                </View>
                <ScrollView>
                    {this.renderEvents()}
                </ScrollView>
                <View style={styles.addEvent} >
                    <AddEventButton />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 30,
        backgroundColor: "#212121",
    },
    dayContainer: {
        flex: 1,
    },
    addEvent: {
        position: "absolute",
        bottom: '3%',
        left: '82%'
    }
});
