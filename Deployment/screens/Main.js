import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import WeekHeader from '../components/WeekHeader';
import AddEventButton from '../components/AddEventButton';
import EmptyDay from '../components/EmptyDay';
import TimeDay from '../components/TimeDay';

import { newEvent } from '../utils/EventsUtils';

export default class Main extends React.Component {
    /* STATE AND CONSTRUCTOR */

    state = {
        events: [
            {
                key: '0',
                name: "Saltar a la comba",
                icon: "",
                color: "red",
                totalTimes: 3,
                time: 0,
                repeat: "daily",
                hour: "10:00",
            },
            {
                key: '1',
                name: "Comer",
                icon: "",
                color: "red",
                totalTimes: 3,
                time: 0,
                repeat: "daily",
                hour: "10:00",
            },
            {
                key: '2',
                name: "Ir a misa",
                icon: "",
                color: "red",
                totalTimes: 3,
                time: 0,
                repeat: "daily",
                hour: "15:00",
            },
            // {
            //     name: "Recorrer el missisipi",
            //     icon: "",
            //     color: "red",
            //     totalTimes: 3,
            //     time: 0,
            //     repeat: "daily",
            //     hour: "21:00",
            // }
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
    addEvent = () => {
        const { morningEvents, afternoonEvents, nightEvents } = this.state;
        const added = {
            name: "Ir al instituto",
            icon: "",
            color: "red",
            totalTimes: 3,
            time: 0,
            repeat: "daily",
            hour: "10:00",
        }

        switch (true) {
            case (this.checkHour(added.hour) == "morning"):
                this.setState({
                    morningEvents: [newEvent(added), ...morningEvents],
                });
                break;
            case (this.checkHour(added.hour) == "afternoon"):
                this.setState({
                    afternoonEvents: [newEvent(added)],
                });
                break;
            case (this.checkHour(newEaddedent.hour) == "night"):
                this.setState({
                    nightEvents: [newEvent(added), ...nightEvents],
                });
                break;
        }
    }

    /* LAYOUT */
    render() {
        const { events, morningEvents, afternoonEvents, nightEvents } = this.state;        

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
                                <TimeDay time={"morning"} events={morningEvents} />
                                <TimeDay time={"afternoon"} events={afternoonEvents} />
                                <TimeDay time={"night"} events={nightEvents} />
                            </View>
                        )}
                </ScrollView>
                <View style={styles.addEvent} >
                    <AddEventButton addEvents={this.addEvent} />
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
