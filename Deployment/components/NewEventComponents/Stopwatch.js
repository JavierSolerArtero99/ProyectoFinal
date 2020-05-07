import React from 'react';

import { View, StyleSheet, Text, SafeAreaView, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Stopwatch extends React.Component {

    /* STATE && CONSTRUCTOR */

    state = {
        adding: false,
        selectedHours: "00",
        selectedMinutes: "00",
        selectedSeconds: "00",
    };

    constructor(props) {
        super(props)
    }

    /* RENDERING METHODS */

    editTimer = () => {
        this.setState({
            adding: true,
        })
    }

    renderEditableTimer = () => {
        const { color } = this.props;
        const { selectedHours, selectedMinutes, selectedSeconds } = this.state;

        return (
            <View style={styles.stopwatchContainer}>

                {/* hours */}
                <View style={styles.pickerContainer}>
                    <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateTime() }}>
                        <Text style={[styles.pickerText, { color: color }]}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.pickerText}>
                        {selectedHours}
                    </Text>
                    <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateTime() }}>
                        <Text style={[styles.pickerText, { color: color }]}>-</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.separator}>:</Text>
                </View>

                {/* minutes */}
                <View style={styles.pickerContainer}>
                    <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateTime() }}>
                        <Text style={[styles.pickerText, { color: color }]}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.pickerText}>
                        {selectedMinutes}
                    </Text>
                    <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateTime() }}>
                        <Text style={[styles.pickerText, { color: color }]}>-</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.separator}>:</Text>
                </View>

                {/* seconds */}
                <View style={styles.pickerContainer}>
                    <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateTime() }}>
                        <Text style={[styles.pickerText, { color: color }]}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.pickerText}>
                        {selectedSeconds}
                    </Text>
                    <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateTime() }}>
                        <Text style={[styles.pickerText, { color: color }]}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /* LAYOUT */
    render() {
        const { adding } = this.state;
        const { color } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADD A STOPWATCH</Text>
                {(!adding)
                    ?
                    (<TouchableOpacity
                        style={styles.button}
                        onPress={this.editTimer}
                    >
                        <Text style={{ color: color, fontSize: 15, fontWeight: "bold" }}>+</Text>
                    </TouchableOpacity>)
                    :
                    (this.renderEditableTimer())
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginTop: 15,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: "#323232",
        alignItems: "center",
    },
    title: {
        color: "#dbdbdb",
        fontWeight: "bold",
        marginBottom: 5,
    },
    button: {
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "#434343",
        borderRadius: 15,
    },
    stopwatchContainer: {
        flexDirection: "row",
    },
    pickerContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
    },
    separator: {
        fontWeight: "bold",
        color: "#dbdbdb",
    },
    manipulateTime: {
        backgroundColor: "#434343",
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    pickerText: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
    },
});