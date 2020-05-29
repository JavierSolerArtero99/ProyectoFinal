import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Button, TouchableHighlight } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Streaks(props) {
    return (
        <View style={[styles.streakContainer, {backgroundColor: props.color}]}>
            <Text style={styles.actualStreak}>{props.actualStreak} Days</Text>
            <Text style={styles.actualStreakTitle}>Actual Streak</Text>

            <View style={styles.bestStreakContainer}>
                <View style={styles.trophy}>
                    <MaterialCommunityIcons name={"trophy"} color={"#d9b84c"} size={20} />
                </View>
                <Text style={[styles.bestStreakText, {fontSize: 20}]}> {props.bestStreak}</Text>
                <Text style={styles.bestStreakText}> Days</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    streakContainer: {
        width: '90%',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    actualStreak: {
        color: "#545454",
        fontSize: 40,
        fontWeight: "bold",
    },
    actualStreakTitle: {
        color: "#545454",
        fontSize: 15,
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
        color: "#545454",
        fontWeight: "bold"
    }
});