import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import WeekHeader from '../components/WeekHeader';
import AddEventButton from '../components/AddEventButton';
import EmptyDay from '../components/EmptyDay';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    renderEvents() {
        const { events } = this.state;

        if(events.length == 0) {
            return(
                <EmptyDay />
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
    addEvent: {
        position: "absolute",
        bottom: '3%',
        left: '82%'
    }
});
