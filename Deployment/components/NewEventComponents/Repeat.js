import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Repeat extends React.Component {
    /* STATE */
    state = {
        selected: "day",
        diaryChecked: "#2380d1",
        weeklyChecked: "#434343",
        monthlyChecked: "#434343",

        days: ["M", "T", "W", "T", "F", "S", "S"],
        weeks: [1, 2, 3, 4, 5, 6],
        months: [1, 2, 3,]
    }

    /* TOUCHABLE EVENTS */

    changeDaily = () => {
        const { color } = this.props;

        this.setState({
            selected: "day",
            diaryChecked: "#2380d1",
            weeklyChecked: "#434343",
            monthlyChecked: "#434343",
        });
    }

    changeWeekly = () => {
        const { color } = this.props;

        this.setState({
            selected: "week",
            diaryChecked: "#434343",
            weeklyChecked: "#2380d1",
            monthlyChecked: "#434343",
        });
    }

    changeMonthly = () => {
        const { color } = this.props;

        this.setState({
            selected: "month",
            diaryChecked: "#434343",
            weeklyChecked: "#434343",
            monthlyChecked: "#2380d1",
        });
    }

    /* LAYOUT */
    render() {
        const {
            diaryChecked,
            weeklyChecked,
            monthlyChecked,
            selected,
            days,
            weeks,
            months,
        } = this.state
        const { color } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Repeat</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.repeatSelector, { backgroundColor: diaryChecked }]}
                        onPress={this.changeDaily}
                    >
                        <Text style={styles.repeatText}>Diary</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.repeatSelector, { backgroundColor: weeklyChecked }]}
                        onPress={this.changeWeekly}
                    >
                        <Text style={styles.repeatText}>Weekly</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.repeatSelector, { backgroundColor: monthlyChecked }]}
                        onPress={this.changeMonthly}
                    >
                        <Text style={styles.repeatText}>Monthly</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.repeatContainer}>
                    {(selected == "day") && (
                        <View>
                            <Text style={[styles.repeatText, { marginLeft: 5 }]}>Days to repeat</Text>
                            <View style={styles.repeatContainer}>
                                {days.map((day) => {
                                    return (
                                        <TouchableOpacity style={[styles.selectorCirlcle, {backgroundColor: color}]}>
                                            <Text style={styles.repeatText}>{day}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    )}

                    {(selected == "week") && (
                        <View>
                            <Text style={[styles.repeatText, { marginLeft: 5 }]}>Days to repeat in week</Text>
                            <View style={styles.repeatContainer}>
                                {weeks.map((week) => {
                                    return (
                                        <TouchableOpacity style={[styles.selectorCirlcle, {backgroundColor: color}]}>
                                            <Text style={styles.repeatText}>{week}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    )}

                    {(selected == "month") && (
                        <View>
                            <Text style={[styles.repeatText, { marginLeft: 5 }]}>Times to repeat in month</Text>
                            <View style={styles.repeatContainer}>
                                {months.map((month) => {
                                    return (
                                        <TouchableOpacity style={[styles.selectorCirlcle, {backgroundColor: color}]}>
                                            <Text style={styles.repeatText}>{month}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    )}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#323232",
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
        padding: 10,
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        alignSelf: "center",
        fontSize: 15,
        fontWeight: "bold",
        color: "#dbdbdb"
    },
    buttonsContainer: {
        marginTop: 10,
        justifyContent: "center",
        flexDirection: "row",
    },
    repeatSelector: {
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        borderRadius: 15,
    },
    repeatText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#dbdbdb"
    },
    repeatContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    selectorCirlcle: {
        borderRadius: 50,
        marginLeft: 5,
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
    }
}); 