import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Button, TouchableHighlight } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SingleEventCounter from '../components/SingleEventStatsComponents/SingleEventCounter';
import SingleEventStopWatch from '../components/SingleEventStatsComponents/SingleEventStopwatch';
import Streaks from '../components/SingleEventStatsComponents/Streaks';
import LittleStreaks from '../components/SingleEventStatsComponents/LittleStreak';

import Stats from '../models/Stats';


export default class SingleEventStats extends React.Component {

    /* CONSTRUCTOR */
    constructor(props) {
        super(props)
    }

    /* METODOS DE RENDERIZACION */

    /**
     * renderiza los componentes necesarios dependiendo si el evento
     * tiene un contador o un cronometro
     */
    renderSpecificComponents = (event) => {
        const { addTotalTimeCounter, startStopCounter } = this.props.route.params.params;
        let specificComponent;

        switch (true) {
            case (event.totalTimes == 1 && event.time == 0):
                // componente con cronometro
                specificComponent = (
                    <View></View>
                );
                break;
            case (event.totalTimes > 1 && event.time == 0):
                // componente con contador
                specificComponent = (
                    <SingleEventCounter
                        addTotalTimeCounter={addTotalTimeCounter}
                        event={event}
                    />
                );
                break;
            case (event.totalTimes == 1 && event.time >= 0):
                // componente con cronometro
                specificComponent = (
                    <SingleEventStopWatch
                        event={event}
                        time={event.time}
                        startStopCounter={startStopCounter}
                    />
                );
                break;
        }

        return (specificComponent);
    }

    /* ESTADISTICAS */

    /**
     * devuelve la media diaria del evento
     */
    getDailyAverage = (event) => {
        const date = new Date();
        const dateString = (date.getUTCDate() + "-" + (date.getMonth()) + "-" + date.getFullYear())

        if (event.totalTimesChecked < 1 || event.totalTimesChecked == undefined) return 0;
        
        if ((event.totalTimesChecked / Stats.getDays(event.date, dateString)).toFixed(2) == Infinity) return 1

        return (event.totalTimesChecked / Stats.getDays(event.date, dateString)).toFixed(2);
    }

    /**
     * obtiene el porcentaje de cumplimiento del evento
     */
    getPercentage = (event) => {
        const date = new Date();
        const dateString = (date.getUTCDate() + "-" + (date.getMonth()) + "-" + date.getFullYear())

        if (event.totalTimesChecked < 1 || event.totalTimesChecked == undefined) return 0 

        if (((event.totalTimesChecked / Stats.getDays(event.date, dateString)).toFixed(2) * 100) == Infinity) return 100

        return ((event.totalTimesChecked / Stats.getDays(event.date, dateString)).toFixed(2) * 100);
    }

    /* EVENTOS */

    /** Navegacion
    * va al layout de detalle del evento
    */
    goDetailEvent = () => {
        const { event, navigation, editEvent, deleteEvent } = this.props.route.params.params;
        navigation.navigate("DetailEvent", { params: { navigation, event, editEvent, deleteEvent } });
    }

    /* LAYOUT */
    render() {
        const { event } = this.props.route.params.params;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.scrollView} >
                        {/* icono */}
                        <MaterialCommunityIcons name={event.icon} color={event.color} size={60} />

                        {/* nombre */}
                        <Text style={[styles.eventName, { color: event.color }]}>{event.name}</Text>

                        {/* fechas */}
                        <View style={styles.dateContainer}>
                            <View style={styles.singleDateContainer}>
                                <Text style={styles.description}>Begin date:</Text>
                                <Text style={styles.description}>{event.date}</Text>
                            </View>
                            <View style={styles.singleDateContainer}>
                                <Text style={styles.description}>End date:</Text>
                                <Text style={styles.description}>{event.endDate}</Text>
                            </View>
                        </View>

                        {/* contador / cronometro */}
                        {this.renderSpecificComponents(event)}

                        {/* descripcion */}
                        {/* {(event.description.length > 0) && (<Text style={styles.descriptionText}>{event.description}</Text>)} */}

                        {/* estadisticas */}
                        <Streaks
                            actualStreak={event.actualStreak}
                            bestStreak={event.bestStreak}
                            color={event.color}
                        />
                        <View style={styles.streaksContainer}>
                            <LittleStreaks
                                title={"Daily average"}
                                data={this.getDailyAverage(event)}
                                icon={"chart-line-variant"}
                                color={"#ff005a"}
                            />
                            <View style={{ width: 25 }}></View>
                            <LittleStreaks
                                title={"Total times checked"}
                                data={event.totalTimesChecked}
                                icon={"progress-check"}
                                color={"#4ad869"}
                            />
                        </View>
                        <View style={styles.streaksContainer}>
                            <LittleStreaks
                                title={"Fulfillment percentage"}
                                data={this.getPercentage(event) + " %"}
                                icon={"flash-circle"}
                                color={"#14ffec"}
                            />
                        </View>

                        {/* boton para editar */}
                        <TouchableHighlight
                            style={[styles.editButton, { backgroundColor: event.color }]}
                            onPress={this.goDetailEvent}
                        >
                            <MaterialCommunityIcons name={"pencil"} color={"#323232"} size={35} />
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingVertical: 10,
        backgroundColor: "#212121",
        justifyContent: "center",
    },
    scrollView: {
        alignItems: "center",
    },
    eventName: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 25,
    },
    dateContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    singleDateContainer: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    description: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 5,
    },
    descriptionText: {
        justifyContent: "center",
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 10,
    },
    editButton: {
        marginTop: 10,
        width: '90%',
        alignItems: "center",
        borderRadius: 15,
        paddingVertical: 5,
        alignSelf: "center",
    },
    streaksContainer: {
        flexDirection: "row",
        marginTop: 10,
        width: '90%',
        height: 125,
    }
});