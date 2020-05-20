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
import { modifyEvent } from '../utils/EventsUtils';

export default class DetailEventScreen extends React.Component {

    /* CONSTRUCTOR && STATE*/
    state = {
        id: 0,
        newName: "",
        newDescription: "",
        newColor: "",
        newIcon: "",
        newDate: [],
        newEndDate: [],
        newTimers: [],
        newTotalTimes: 1,
        newTime: 0,
        hour: "09:00",
    }

    constructor(props) {
        super(props)
    }

    /* CICLO DE VIDA */

    componentDidMount() {
        const { event } = this.props.route.params.params;

        this.setState({
            id: event.id,
            newName: event.name,
            newDescription: event.description,
            newDate: event.date,
            newEndDate: event.endDate,
            newTimers: event.timers,
            newIcon: event.icon,
            newColor: event.color,
            newTotalTimes: event.totalTimes,
            newTime: event.time,
            hour: event.hour,
            eventType: event.eventType,
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

    /**
     * llama al metodo del componente padre para actualizar
     * el evento que se esta visualizando
     */
    editEvent = () => {
        const { navigation } = this.props;
        const { editEvent } = this.props.route.params.params;

        editEvent(this.state)
        navigation.navigate("Main")
    }

    /**
     * llama al metodo del componente padre para eliminar
     * el evento que se esta visualizando
     */
    deleteEvent = () => {
        const { navigation } = this.props;
        const { deleteEvent } = this.props.route.params.params;
        const { id } = this.state;
         
        deleteEvent(id)
        navigation.navigate("Main")
    }

    /* EVENTOS DE LOS COMPONENTES REUTILIZADOS*/

    /**
     * actualizan el nombre 
     */
    updateName = (input) => {
        this.setState({
            newName: input,
        })
    }

    /**
     * actualizan la desctipcion
     */
    updateDescription = (input) => {
        this.setState({
            newDescription: input,
        })
        console.log(input)
    }

    /**
     * actualiza el color del evento
     */
    updateColor = (color) => {
        this.setState({
            newColor: color,
        })
    }

    /**
     * cambia el icono por el que se pasa por parametro
     */
    updateIcon = (newIcon) => {
        this.setState({
            newIcon: newIcon,
        })
    }

    /**
     * actualiza la hora del evento
     */
    updateHour = (hour) => {
        console.log(hour);
    }

    /**
     * actualiza la fecha de inicio del evento
     */
    updateDate = (date) => {
        this.setState({
            newDate: date,
        });
    }

    /**
     * actualiza la fecha de finalizacion del evento
     */
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
            newTimers: [this.instanceTimer(hour), ...newTimers],
            hour: hour,
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
        const { newName, newDescription, newTimers, newColor, newIcon } = this.state;

        return (
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <View style={styles.viewContainer} >
                        <MaterialCommunityIcons name={newIcon} color={newColor} size={60} />

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={{ marginRight: 80 }}
                                onPress={this.editEvent}
                            >
                                <MaterialCommunityIcons name="pencil" color={newColor} size={30} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this.deleteEvent}
                            >
                                <MaterialCommunityIcons name="trash-can-outline" color={newColor} size={30} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewContainer}>
                            <View style={{ marginLeft: 5 }}>
                                <Pickers
                                    updateColor={this.updateColor}
                                    updateIcon={this.updateIcon}
                                    defaultIcon={event.icon}
                                    color={newColor}
                                />
                            </View>

                            <TextInput
                                style={styles.name}
                                value={newName}
                                underlineColorAndroid="transparent"
                                onChangeText={this.updateName}
                            />

                            <TextInput
                                style={styles.description}
                                multiline
                                value={newDescription}
                                underlineColorAndroid="transparent"
                                onChangeText={this.updateDescription}
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