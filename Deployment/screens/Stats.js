import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Streaks from '../components/SingleEventStatsComponents/Streaks';
import LittleStreaks from '../components/SingleEventStatsComponents/LittleStreak';


import { findAllByPK, } from '../api/EventsDAO';
import User from '../models/user';
import Stats from '../models/Stats';

export default class StatsSreen extends React.Component {

    state = {
        events: [],
    }

    async componentDidMount() {
        this.setState({
            events: await findAllByPK(User._id)
        })
    }

    render() {
        console.log(this.state.events)
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
                                <Text style={styles.description}>{"10-05-2020"}</Text>
                            </View>
                        </View>

                        {/* estadisticas */}
                        <Streaks
                            actualStreak={""}
                            bestStreak={""}
                            color={"#2380d1"}
                        />
                        <View style={styles.streaksContainer}>
                            <LittleStreaks
                                title={"Daily average"}
                                data={0}
                                icon={"chart-line-variant"}
                                color={"#ff005a"}
                            />
                            <View style={{ width: 25 }}></View>
                            <LittleStreaks
                                title={"Total times checked"}
                                data={0}
                                icon={"progress-check"}
                                color={"#4ad869"}
                            />
                        </View>
                        <View style={styles.streaksContainer}>
                            <LittleStreaks
                                title={"Fulfillment percentage"}
                                data={0 + " %"}
                                icon={"flash-circle"}
                                color={"#14ffec"}
                            />
                            <View style={{ width: 25 }}></View>
                            <LittleStreaks
                                title={"Fulfillment percentage"}
                                data={0 + " %"}
                                icon={"certificate"}
                                color={"#ffc801"}
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