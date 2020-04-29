import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import TimePicker from './TimePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Timer from './Timer';

export default class Timers extends React.Component {

    /* STATE && CONSTRUCTOR */

    state = {
        timer: {
            id: 2,
            hour: ""
        },
        creatingTimer: false,
    }

    constructor(props) {
        super(props);
    }

    /* EVENTOS */

    /**
     * envia al componente padre el nuevo timer para añadirlo
     * y devuelve la vista a su estado normal
     */
    createTimer = () => {
        const { timer } = this.state;
        this.setState({
            creatingTimer: true,
        });
    }

    /**
     * cambia la vista para añadir un nuevo timer
     */
    addNewTimer = () => {
        const { hour } = this.state;
        const { addTimer } = this.props;

        console.log("se va a añadir: " + hour);
        addTimer(hour);
        
        this.setState({
            creatingTimer: false,
        });
        
    }
    
    /**
     * evento que se lanza cuando se cambia la hora
     * para que se actualize en el state del 
     * componente padre
     */
    changeTimer = (newHour) => {
        this.setState({
            hour: newHour,
        })
    }

    /* LAYOUT */
    render() {
        const { timers, color, removeTimer } = this.props;
        const { creatingTimer } = this.state;

        return (
            <View style={styles.timerContainer}>
                <Text style={styles.title}>REMINDERS</Text>
                {(timers.length >= 0) && (
                    timers.map((timer) => {
                        return (
                            <Timer
                                color={color}
                                timer={timer}
                                removeTimer={removeTimer}
                            />
                        );
                    })
                )}
                {(!creatingTimer) ? (
                    <TouchableOpacity
                        style={styles.addTimerButton}
                        onPress={this.createTimer}
                    >
                        <Text style={[styles.addTimerText, { color: color }]}>+</Text>
                    </TouchableOpacity>
                ) : (
                        <View>
                            <TimePicker
                                color={color}
                                updateHour={this.changeTimer}
                            />
                            <TouchableOpacity
                                style={styles.checkedTimer}
                                onPress={this.addNewTimer}
                            >
                                <Text style={[styles.addTimerText, { color: color }]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timerContainer: {
        borderRadius: 15,
        marginTop: 15,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: "#323232",
    },
    title: {
        alignSelf: "center",
        fontSize: 15,
        color: "#dbdbdb",
        fontWeight: "bold",
    },
    checkedTimer: {
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: "#545454",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 5,
        flex: 1,
    },
    addTimerButton: {
        borderRadius: 50,
        height: 25,
        width: 25,
        backgroundColor: "#545454",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        flex: 1,
    },
    addTimerText:{
        fontSize: 15,
        fontWeight: "bold"
    },
    deleteTimer: {
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 14,
    },
});