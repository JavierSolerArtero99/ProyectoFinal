import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Streaks from '../components/SingleEventStatsComponents/Streaks';
import LittleStreaks from '../components/SingleEventStatsComponents/LittleStreak';


import { findAllByPK, getBestStreak } from '../api/EventsDAO';
import User from '../models/user';
import Stats from '../models/Stats';

export default class StatsSreen extends React.Component {

    /* STATE */

    state = {
        events: [],
    }

    /* LIFECYCLE */

    /**
     * carga los datos en el state
     */
    async componentDidMount() {
        const auxEvents = await findAllByPK(User._id);

        this.setState({
            events: auxEvents,
            bestStreak: await getBestStreak(User._id),
            dailyAverage: (this.getDiaryAverage(auxEvents)).toFixed(2),
            totalChecks: this.getTotalChecks(auxEvents),
            fulfillmentPercen: (this.getDiaryAverage(auxEvents)) * 100,
        })
    }

    /* METODOS PARA ESTADISTICAS */

    /**
     * obtiene la media diaria de todos los eventos del usuario
     */
    getDiaryAverage = (events) => {
        const date = new Date();
        const dateString = (date.getUTCDate() + "-" + (date.getMonth()) + "-" + date.getFullYear())
        let amount = 0;

        events.forEach(event => {
            amount += (event.totalTimesChecked / Stats.getDays(User._date, dateString));
        });

        return amount;
    }

    /**
     * obtiene la cantidad de veces que se han cumplido todos los eventos
     */
    getTotalChecks = (events) => {
        let amount = 0;

        events.forEach(event => {
            amount += event.totalTimesChecked
        });

        return amount;
    }

    /* LAYOUT */
    render() {
        const { bestStreak, events, dailyAverage, totalChecks, fulfillmentPercen } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.scrollView} >
                        {/* icono */}
                        <MaterialCommunityIcons name={"google-analytics"} color={"#2380d1"} size={60} />

                        {/* nombre */}
                        <Text style={styles.eventName}>{User._name}</Text>

                        {/* fechas */}
                        <View style={styles.dateContainer}>
                            <View style={styles.singleDateContainer}>
                                <Text style={styles.description}>Begin date:</Text>
                                <Text style={styles.description}>{User._date}</Text>
                            </View>
                        </View>

                        {/* estadisticas */}
                        <Streaks
                            actualStreak={bestStreak}
                            bestStreak={bestStreak}
                            color={"#2380d1"}
                        />
                        <View style={styles.streaksContainer}>
                            <LittleStreaks
                                title={"Daily average"}
                                data={dailyAverage}
                                icon={"chart-line-variant"}
                                color={"#ff005a"}
                            />
                            <View style={{ width: 25 }}></View>
                            <LittleStreaks
                                title={"Total events checks"}
                                data={totalChecks}
                                icon={"progress-check"}
                                color={"#4ad869"}
                            />
                        </View>
                        <View style={styles.streaksContainer}>
                            <LittleStreaks
                                title={"Fulfillment percentage"}
                                data={fulfillmentPercen + " %"}
                                icon={"flash-circle"}
                                color={"#14ffec"}
                            />
                        </View>

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
        color: "#2380d1",
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
    streaksContainer: {
        flexDirection: "row",
        marginTop: 10,
        width: '90%',
        height: 125,
    }
});