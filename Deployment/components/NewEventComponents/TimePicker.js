import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class TimePicker extends React.Component {

    /* CONSTRUCTOR && STATE */

    state = {
        hours: [],
        minutes: [],
        hoursOffset: 0,
        minutesOffset: 0,
        selectedHour: "",
        selectedMinutes: "",
    }

    constructor(props) {
        super(props);
        const { hours, hoursOffset, minutes, minutesOffset } = this.state;

        // añadiendo las horas
        for (let i = 0; i < 24; i++) {
            if ((i + "").length == 1) {
                hours.push("0" + i);
            } else {
                hours.push(i + "");
            }
        }

        // añadiendo los minutos
        for (let i = 0; i < 60; i++) {
            if ((i + "").length == 1) {
                minutes.push("0" + i);
            } else {
                minutes.push(i + "");
            }
        }
    }

    componentDidMount() {
        const { hours, minutes, } = this.state;
        const { updateHour } = this.props;

        this.setState({
            selectedHour: hours[0],
            selectedMinutes: minutes[0],
        });

        updateHour(hours[0] + ":" + minutes[0])
    }

    /* TIME EVENTS */

    upHour = () => {
        const { hours, hoursOffset, selectedHour, selectedMinutes } = this.state
        const { updateHour } = this.props;

        let aux = hoursOffset;

        if ((hoursOffset + 1) > 23) {
            aux = 0;
        } else {
            aux++;
        }

        this.setState({
            hoursOffset: aux,
            selectedHour: hours[aux]
        })

        updateHour(hours[aux] + ":" + selectedMinutes)
    }

    downHour = () => {
        const { hours, hoursOffset, selectedHour, selectedMinutes } = this.state
        const { updateHour } = this.props;

        let aux = hoursOffset;

        if ((hoursOffset - 1) < 0) {
            aux = 23;
        } else {
            aux--;
        }

        this.setState({
            hoursOffset: aux,
            selectedHour: hours[aux]
        })

        updateHour(hours[aux] + ":" + selectedMinutes)
    }

    upMinutes = () => {
        const { minutes, minutesOffset, selectedHour, selectedMinutes  } = this.state
        const { updateHour } = this.props;

        let aux = minutesOffset;

        if ((minutesOffset + 1) > 59) {
            aux = 0;
        } else {
            aux++;
        }

        this.setState({
            minutesOffset: aux,
            selectedMinutes: minutes[aux]
        })

        updateHour(selectedHour + ":" + minutes[aux])
    }

    downMinutes = () => {
        const { minutes, minutesOffset, selectedHour, selectedMinutes  } = this.state
        const { updateHour } = this.props;

        let aux = minutesOffset;

        if ((minutesOffset - 1) < 0) {
            aux = 59;
        } else {
            aux--;
        }


        this.setState({
            minutesOffset: aux,
            selectedMinutes: minutes[aux]
        })

        updateHour(selectedHour + ":" + minutes[aux])
    }

    /* LAYOUT */
    render() {
        const { selectedHour, selectedMinutes } = this.state;
        const { color } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.datePickerContainer}>
                    {/* hours */}
                    <View style={styles.picker}>
                        <TouchableOpacity style={styles.manipulateTime} onPress={this.upHour}>
                            <Text style={[styles.pickerText, {color: color}]}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {selectedHour}
                        </Text>
                        <TouchableOpacity style={styles.manipulateTime} onPress={this.downHour}>
                            <Text style={[styles.pickerText, {color: color}]}>-</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.picker, { justifyContent: "center" }]}>
                        <Text style={styles.pickerText}>
                            :
                        </Text>
                    </View>

                    {/* minutes */}
                    <View style={styles.picker}>
                        <TouchableOpacity style={styles.manipulateTime} onPress={this.upMinutes}>
                            <Text style={[styles.pickerText, {color: color}]}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.pickerText}>
                            {selectedMinutes}
                        </Text>
                        <TouchableOpacity style={styles.manipulateTime} onPress={this.downMinutes}>
                            <Text style={[styles.pickerText, {color: color}]}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#323232",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 15,
        padding: 5
    },
    datePickerContainer: {
        flexDirection: "row",
    },
    picker: {
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 5,
        alignItems: "center",
        flexDirection: "column",
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
    }
});