import React from 'react';
import { View, Image, StyleSheet, Text, TextInput } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import TimerList from '../components/NewEventComponents/TimerList';
import CustomDatePicker from '../components/NewEventComponents/CustomDatePicker';

export default class DetailEventScreen extends React.Component {

    /* CONSTRUCTOR && STATE*/

    state = {
        editing: false,
        newDate: [],
        newTimers: [],
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { event } = this.props.route.params.params;

        this.setState({
            newDate: event.date,
            newTimers: event.timers,
        })
    }

    /* METODOS DE RENDERIZACION */

    renderHabitsComponents = () => {
        return (
            <View>
                <Text> habitooo </Text>
            </View>
        )
    }

    /* EVENTOS DE LA PROPIA SCREEN */

    editEvent = () => {
        const { editing } = this.state;

        this.setState({
            editing: !editing,
        })
    }

    /* EVENTOS DE LOS COMPONENTES REUTILIZADOS*/

    updateHour = (hour) => {
        console.log(hour);
    }

    updateDate = (date) => {
        this.setState({
            newDate: date,
        });
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
        const { newTimers } = this.state;

        console.log("===STATE===")
        console.log(this.state)

        return (
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <View style={styles.viewContainer} >
                        <MaterialCommunityIcons name={event.icon} color={event.color} size={60} />

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={{ marginRight: 80 }}
                                onPress={this.editEvent}
                            >
                                <MaterialCommunityIcons name="pencil" color={event.color} size={30} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <MaterialCommunityIcons name="trash-can-outline" color={event.color} size={30} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewContainer}>
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

                            {(event.eventType == "HABIT")
                                &&
                                (this.renderHabitsComponents())
                            }
                        </View>

                        <CustomDatePicker
                            updateDate={this.updateDate}
                            color={event.color}
                            title={event.eventType + " DATE"}
                            event={event}
                        />

                        <View style={{ marginTop: 10, width: '100%' }}>
                            <TimerList
                                timers={newTimers}
                                color={event.color}
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
        marginTop: 10,
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