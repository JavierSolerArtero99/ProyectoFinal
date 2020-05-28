import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Button, TouchableHighlight } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LittleStreaks(props) {
    return (
        <View style={[styles.streakContainer]}>
            <View style={{alignSelf: "flex-end"}}>
                <MaterialCommunityIcons name={props.icon} color={props.color} size={25} />
            </View>
            <Text style={styles.actualStreak}>{props.data}</Text>
            <Text style={styles.actualStreakTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    streakContainer: {
        flex: 1,
        backgroundColor: "#434343",
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        alignItems: "flex-start",
    },
    actualStreak: {
        color: "#dbdbdb",
        fontSize: 25,
        fontWeight: "bold",
    },
    actualStreakTitle: {
        color: "#dbdbdb",
        fontSize: 13,
        fontWeight: "bold",
    },
    bestStreakContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    trophy: {
        padding: 10,
        backgroundColor: "#545454",
        borderRadius: 100,
        marginTop: 10,
    },
    bestStreakText: {
        fontSize: 15,
        color: "#dbdbdb",
        fontWeight: "bold"
    }
});