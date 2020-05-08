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

    /* EVENTOS */

    /**
     * añade el cronometro
     */
    addStopwatch = () => {
        const { updateTime, resetTotalTimes, } = this.props;
        const { selectedHours, selectedMinutes, selectedSeconds, } = this.state;
        const hour = selectedHours + ":" + selectedMinutes + ":" + selectedSeconds;

        updateTime(hour);
        resetTotalTimes();

        this.setState({
            adding: false,
        })
    }

    /**
     * cambia a el modo normal de la vista
     */
    cancelStopwatch = () => {
        const { updateTime } = this.props;
        const { selectedHours, selectedMinutes, selectedSeconds, } = this.state;
        const hour = selectedHours + ":" + selectedMinutes + ":" + selectedSeconds;

        this.setState({
            adding: false,
            selectedHours: "00",
            selectedMinutes: "00",
            selectedSeconds: "00",
        });

        updateTime(hour);
    }

    /* MANIPULACION DEL TIEMPO */

    updateHours = (operation) => {
        let variation = 0;
        let newValue = 0;
        const { selectedHours, selectedMinutes, selectedSeconds, } = this.state;

        if (operation == '+') {
            variation++;

            if (parseInt(selectedHours) >= 23) {
                variation = -23;
            }

        } else {
            variation--;

            if (parseInt(selectedHours) <= 0) {
                variation = 23;
            }
        }

        newValue = parseInt(selectedHours) + variation;

        if ((newValue + "").length == 1) {
            newValue = "0" + newValue;
        }

        this.setState({
            selectedHours: newValue,
        });
    }

    updateMinutes = (operation) => {
        let variation = 0;
        let newValue = 0;
        const { selectedHours, selectedMinutes, selectedSeconds, } = this.state;

        if (operation == '+') {
            variation++;

            if (parseInt(selectedMinutes) >= 59) {
                variation = -59;
            }

        } else {
            variation--;

            if (parseInt(selectedMinutes) <= 0) {
                variation = 59;
            }
        }

        newValue = parseInt(selectedMinutes) + variation;

        if ((newValue + "").length == 1) {
            newValue = "0" + newValue;
        }

        this.setState({
            selectedMinutes: newValue,
        });
    }

    updateSeconds = (operation) => {
        let variation = 0;
        let newValue = 0;
        const { selectedHours, selectedMinutes, selectedSeconds } = this.state;

        if (operation == '+') {
            variation++;

            if (parseInt(selectedSeconds) >= 59) {
                variation = -59;
            }

        } else {
            variation--;

            if (parseInt(selectedSeconds) <= 0) {
                variation = 59;
            }
        }

        newValue = parseInt(selectedSeconds) + variation;

        if ((newValue + "").length == 1) {
            newValue = "0" + newValue;
        }

        this.setState({
            selectedSeconds: newValue,
        });
    }

    static reset() {
        console.log("hola");
        
        this.setState({
            selectedHours: "00",
            selectedMinutes: "00",
            selectedSeconds: "00",
        });
    }

    /* METODOS DE RENDERIZACION */

    /**
     * cambia el modo de la vista a editar
     * un cronometro
     */
    editTimer = () => {
        this.setState({
            adding: true,
        })
    }

    renderEditableTimer = () => {
        const { color } = this.props;
        const { selectedHours, selectedMinutes, selectedSeconds } = this.state;

        return (
            <View style={{ flexDirection: "column" }}>
                <View style={styles.stopwatchContainer}>

                    {/* hours */}
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateHours('+') }}>
                            <Text style={[styles.pickerText, { color: color }]}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {selectedHours}
                        </Text>
                        <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateHours('-') }}>
                            <Text style={[styles.pickerText, { color: color }]}>-</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.separator}>:</Text>
                    </View>

                    {/* minutes */}
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateMinutes('+') }}>
                            <Text style={[styles.pickerText, { color: color }]}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {selectedMinutes}
                        </Text>
                        <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateMinutes('-') }}>
                            <Text style={[styles.pickerText, { color: color }]}>-</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.separator}>:</Text>
                    </View>

                    {/* seconds */}
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateSeconds('+') }}>
                            <Text style={[styles.pickerText, { color: color }]}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {selectedSeconds}
                        </Text>
                        <TouchableOpacity style={styles.manipulateTime} onPress={() => { this.updateSeconds('-') }}>
                            <Text style={[styles.pickerText, { color: color }]}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.manipulateTime, { marginRight: 15 }]} onPress={this.addStopwatch}>
                        <Text style={[styles.pickerText, { color: color }]}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.manipulateTime, {}]} onPress={this.cancelStopwatch}>
                        <Text style={[styles.pickerText, { color: color }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /* LAYOUT */
    render() {
        const { adding, selectedHours, selectedMinutes, selectedSeconds, } = this.state;
        const { color } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADD A STOPWATCH</Text>
                {(!adding)
                    ?
                    (<View style={styles.hourContainer}>
                        <Text style={styles.pickerText}>{selectedHours} : {selectedMinutes} : {selectedSeconds}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.editTimer}
                        >
                            <MaterialCommunityIcons name={"pencil"} color={color} size={15} />
                        </TouchableOpacity>
                    </View>)
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
    hourContainer: {
        alignItems: "center",
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
    buttonContainer: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
});