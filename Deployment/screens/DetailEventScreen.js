import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, ToastAndroid } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Pickers from '../components/NewEventComponents/Pickers';
import TimerList from '../components/NewEventComponents/TimerList';
import CustomDatePicker from '../components/NewEventComponents/CustomDatePicker';
import Repeat from '../components/NewEventComponents/Repeat';
import Count from '../components/NewEventComponents/Count';
import Stopwatch from '../components/NewEventComponents/Stopwatch';

export default class DetailEventScreen extends React.Component {

    /* CONSTRUCTOR && STATE*/

    state = {
        newDate: [],
        newEndDate: [],
        newTimers: [],
        newTotalTimes: 1,
        newTime: 0,
    }

    constructor(props) {
        super(props)
    }

    /* CICLO DE VIDA */

    componentDidMount() {
        const { event } = this.props.route.params.params;

        this.setState({
            newDate: event.date,
            newEndDate: event.endDate,
            newTimers: event.timers,
            newColor: event.color,
        })
    }

    /* METODOS DE RENDERIZACION */

    renderHabitsComponents = () => {
        const { event } = this.props.route.params.params;
        const { newTotalTimes, newColor } = this.state;

        return (
            <View style={{ width: '100%' }}>
                <Repeat
                    color={newColor}
                />

                <CustomDatePicker
                    updateDate={this.updateEndDate}
                    color={newColor}
                    dateToShow={event.endDate}
                    title={event.eventType + " END"}
                    event={event}
                />

                <Count
                    color={newColor}
                    totalTimes={newTotalTimes}
                    updateTotalTimes={this.updateTotalTimes}
                    resetStopwatch={this.resetStopwatch}
                />

                <Stopwatch
                    updateTime={this.updateTime}
                    color={newColor}
                    resetTotalTimes={this.resetTotalTimes}
                />

            </View>
        )
    }

    /* ASYNC METHODS */

    editEvent = async () => {
        
    }

    /* EVENTOS DE LOS COMPONENTES REUTILIZADOS*/

    /**
     * actualiza el color del evento
     */
    updateColor = (color) => {
        this.setState({
            newColor: color,
        })
    }

    updateHour = (hour) => {
        console.log(hour);
    }

    updateDate = (date) => {
        this.setState({
            newDate: date,
        });
    }

    updateEndDate = (date) => {
        this.setState({
            newEndDate: date,
        });
    }

    /**
     * actualiza la cantidad total de veces que
     * se tiene que hacer el evento
     */
    updateTotalTimes = (variation) => {
        const { newTotalTimes } = this.state;
        let augment = 0;

        (variation == '+') ? (augment++) : (augment--)

        if (newTotalTimes <= 1 && variation == '-') {
            augment = 0;
            ToastAndroid.showWithGravity(
                "Cannot be less than 1",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

        if (newTotalTimes >= 50 && variation == '+') {
            augment = 0;
            ToastAndroid.showWithGravity(
                "Cannot be more than 50",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

        this.setState({
            newTotalTimes: newTotalTimes + augment,
        });
    }

    /**
     * reinicia el cronometro
     */
    resetStopwatch = () => {
        this.setState({
            newTime: 0,
        })
    }

    /**
     * cambia el valor de timer añadiendo
     * un cronometro para el evento
     */
    updateTime = (time) => {
        this.setState({
            newTime: time,
        })
    }

    /**
     * reinicia el contador
     */
    resetTotalTimes = () => {
        this.setState({
            newTotalTimes: 1,
        })
    }

    /**
     * añade un recordatorio al array de estos
     */
    addTimer = (hour) => {
        const { newTimers } = this.state;

        this.setState({
            newTimers: [this.instanceTimer(hour), ...newTimers]
        });
    }

    /**
     * instancia un nuevo timer con la id actualizada
     */
    instanceTimer = (hour) => {
        const { newTimers } = this.state;
        let id;

        if (newTimers.length > 0) {
            id = (newTimers[newTimers.length - 1]).id++;
        } else {
            id = 1;
        }

        let newTimer = {
            id: id,
            hour: hour,
        }

        return newTimer;
    }

    /**
     * elimina el reminder seleccionado
     */
    removeTimer = (idTimer) => {
        this.setState({
            //filtro
            newTimers: this.state.newTimers.filter(t => t.id !== idTimer),
        });
    }

    /* LAYOUT */
    render() {
        const { event } = this.props.route.params.params;
        const { newTimers, newColor } = this.state;

        console.log("===EVENT===")
        console.log(event)

        return (
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <View style={styles.viewContainer} >
                        <MaterialCommunityIcons name={event.icon} color={newColor} size={60} />

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={{ marginRight: 80 }}
                                onPress={this.editEvent}
                            >
                                <MaterialCommunityIcons name="pencil" color={newColor} size={30} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <MaterialCommunityIcons name="trash-can-outline" color={newColor} size={30} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewContainer}>
                            <View style={{marginLeft: 5}}>
                                <Pickers
                                    updateColor={this.updateColor}
                                    color={newColor}
                                />
                            </View>

                            <TextInput
                                style={styles.name}
                                placeholder={event.name}
                                underlineColorAndroid="transparent"
                            />

                            <TextInput
                                style={styles.description}
                                multiline
                                placeholder={event.description}
                                underlineColorAndroid="transparent"
                            />

                            <CustomDatePicker
                                updateDate={this.updateDate}
                                dateToShow={event.date}
                                color={newColor}
                                title={event.eventType + " BEGIN"}
                                event={event}
                            />

                            {(event.eventType == "HABIT")
                                &&
                                (this.renderHabitsComponents())
                            }
                        </View>

                        <View style={{ marginTop: 10, width: '100%' }}>
                            <TimerList
                                timers={newTimers}
                                color={newColor}
                                addTimer={this.addTimer}
                                removeTimer={this.removeTimer}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 15,
        backgroundColor: "#212121",
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    viewContainer: {
        width: '100%',
        alignItems: "center",
    },
    name: {
        width: '90%',
        backgroundColor: "#323232",
        paddingHorizontal: 10,
        padding: 10,
        borderRadius: 15,
        color: "#dbdbdb",
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        width: '90%',
        backgroundColor: "#323232",
        paddingBottom: 40,
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        color: "#dbdbdb",
        fontWeight: "bold",
    },
});