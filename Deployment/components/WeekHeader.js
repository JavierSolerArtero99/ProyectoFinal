import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class WeekHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekDays: ["MON", "TUE", "WED", "TRU", "FRI", "SAT", "SUN"],
            today: "",
            currentWeek: []
        }
    }

    componentDidMount() {
        let curr = new Date
        let week = []

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
            week.push(day.charAt(8) + day.charAt(9))
        }

        this.setState({
            currentWeek: week,
            today: curr.getDay()
        });
    }

    renderWeek(weekDays) {
        return weekDays.map((day) => {
            return (
                <View style={styles.day}>
                    <Text style={styles.dayText}>{day}</Text>
                </View>
            )
        })
    }

    renderWeekDays(currentWeek, today) {
        return currentWeek.map((day, index) => {
            return (
                <TouchableOpacity style={styles.day}>
                    <Text style={styles.dayText}>{day}</Text>
                    {(index == today) && (
                    <View style={styles.currentDay}/>
                )}
                </TouchableOpacity>)
        });
    }

    render() {
        const { weekDays, currentWeek, today } = this.state;

        return (
            <View style={styles.container} >
                <View style={styles.dayContainer}>{this.renderWeek(weekDays)}</View>
                <View style={styles.dayContainer}>{this.renderWeekDays(currentWeek, today)}</View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        borderRadius: 10,
        flexDirection: "column",
        backgroundColor: "#323232",
    },
    dayContainer: {
        flex: 1,
        flexDirection: "row"
    },
    day: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    dayText: {
        fontWeight: "bold",
        color: "#dbdbdb"
    },
    currentDay: {
        backgroundColor: "#14ffec",
        borderRadius: 50,
        height: 5,
        width: 5,
    }
});
