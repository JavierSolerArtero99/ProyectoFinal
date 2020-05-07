import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import WeekHeader from '../components/WeekHeader';
import AddEventButton from '../components/AddEventButton';
import EmptyDay from '../components/EmptyDay';
import TimeDay from '../components/TimeDay';

import { newEvent } from '../utils/EventsUtils';

export default class Main extends React.Component {
    /* STATE && CONSTRUCTOR */

    state = {
        events: [
            {
                id: 1,
                name: "Saltar a la comba",
                icon: "basketball",
                description: "Saltar a la comba 100 veces",
                habit: true,
                eventType: "HABIT",
                date: [],
                endDate: [],
                color: "#2380d1",
                hour: "09:00",
                totalTimes: 3,
                time: 0,
                timers: [
                    {
                        id: 1,
                        hour: "09:00",
                    },
                ],
            },
            {
                id: 2,
                name: "Ir a misa",
                icon: "christianity",
                description: "rezar durante 3 horas",
                habit: true,
                eventType: "HABIT",
                date: [],
                endDate: [],
                color: "#ffc801",
                hour: "15:00",
                totalTimes: 0,
                time: 0,
                timers: [
                    {
                        id: 1,
                        hour: "09:00",
                    },
                ],
            },
            {
                id: 3,
                name: "Comprar pan",
                icon: "bread-slice",
                description: "Saltar a la comba 100 veces",
                habit: true,
                eventType: "HABIT",
                date: [],
                endDate: [],
                color: "#ef611e",
                hour: "09:00",
                totalTimes: 3,
                time: 0,
                timers: [
                    {
                        id: 1,
                        hour: "09:00",
                    },
                ],
            },
            {
                id: 4,
                name: "Recoger a Raul",
                icon: "guitar-pick",
                description: "Saltar a la comba 100 veces",
                habit: true,
                eventType: "HABIT",
                date: [],
                endDate: [],
                color: "#ff005a",
                hour: "19:00",
                totalTimes: 3,
                time: 0,
                timers: [
                    {
                        id: 1,
                        hour: "09:00",
                    },
                ],
            },
            
        ],
        morningEvents: [],
        afternoonEvents: [],
        nightEvents: [],
    }

    constructor(props) {
        super(props);

        const { events, morningEvents, afternoonEvents, nightEvents } = this.state;
        this.divideEvents(events, morningEvents, afternoonEvents, nightEvents);
    }

    /* METODOS DE AYUDA */

    /**
     * Devuelve morning, afternoon o night dependiendo
     * de la hora que se le pase por parametro.
     * @param {*} hour: Hora en formato de string 
     */
    checkHour(hour) {
        let check = "";
        hour = parseInt(hour.charAt(0) + hour.charAt(1));

        switch (true) {
            case ((hour >= 6) && (hour < 12)):
                check = "morning";
                break;
            case ((hour >= 12) && (hour < 19)):
                check = "afternoon";
                break;
            case ((hour >= 19)):
                check = "night";
                break;
        }

        return check;
    }

    /**
     * Metodo que divide eventos en distintos 
     * arrays de franjas horarias   
     * @param {*} events: eventos totales
     * Franjas horarias:
     * @param {*} morningEvents 
     * @param {*} afternoonEvents 
     * @param {*} nightEvents 
     */
    divideEvents(events, morningEvents, afternoonEvents, nightEvents) {
        events.forEach(event => {
            switch (true) {
                case (this.checkHour(event.hour) == "morning"):
                    morningEvents.push(event)
                    break;
                case (this.checkHour(event.hour) == "afternoon"):
                    afternoonEvents.push(event)
                    break;
                case (this.checkHour(event.hour) == "night"):
                    nightEvents.push(event)
                    break;
            }
        });
    }

    /* METODOS PARA LOS EVENTOS */

    /**
     * Metodo que añade un nuevo evento al array de estos
     */
    addEvent = (added) => {
        const { events, morningEvents, afternoonEvents, nightEvents } = this.state;
        const aux = {
            name: added.name,
            icon: added.icon,
            color: added.color,
            totalTimes: added.totalTimes,
            time: 0,
            repeat: added.repeat,
            hour: "10:00",
        }

        switch (true) {
            case (this.checkHour(aux.hour) == "morning"):
                this.setState({
                    morningEvents: [newEvent(aux), ...morningEvents],
                });
                break;
            case (this.checkHour(aux.hour) == "afternoon"):
                this.setState({
                    afternoonEvents: [newEvent(aux), ...afternoonEvents],
                });
                break;
            case (this.checkHour(aux.hour) == "night"):
                this.setState({
                    nightEvents: [newEvent(aux), ...nightEvents],
                });
                break;
        }
    }

    /* LAYOUT */
    render() {
        const { events, morningEvents, afternoonEvents, nightEvents } = this.state;
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.staticHeader}>
                    <WeekHeader />
                </View>
                <ScrollView>
                    {(events.length == 0) ?
                        (
                            <EmptyDay />
                        ) : (
                            <View style={styles.dayContainer}>
                                <TimeDay time={"morning"} events={morningEvents} navigation={navigation} />
                                <TimeDay time={"afternoon"} events={afternoonEvents} navigation={navigation} />
                                <TimeDay time={"night"} events={nightEvents} navigation={navigation} />
                            </View>
                        )}
                </ScrollView>
                <View style={styles.addEvent} >
                    <AddEventButton addEvents={this.addEvent} navigation={navigation} />
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
