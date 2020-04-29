import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ToastAndroid } from 'react-native';

import EventTypeButton from '../components/NewEventComponents/EventTypeButton';
import CustomTextInput from '../components/NewEventComponents/CustomTextInput';
import Pickers from '../components/NewEventComponents/Pickers';
import NewEventLargueButton from '../components/NewEventComponents/NewEventLargueButon';
import CustomDatePicker from '../components/NewEventComponents/CustomDatePicker';
import TimerList from '../components/NewEventComponents/TimerList';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Repeat from '../components/NewEventComponents/Repeat';

export default class NewEvent extends React.Component {
    /* CONSTRUCTOR && STATE */
    state = {
        // view state
        name: "",
        description: "",
        habit: true,
        eventType: "HABIT",
        date: [],
        endDate: [],
        color: "#2380d1",
        timers: [
            {
                id: 1,
                hour: "09:00",
            },
        ],
    }

    constructor(props) {
        super(props);
    }

    /* EVENTOS */

    /**
     * Cambia el tipo de evento a 
     * un Check-In
     */
    changeToCheckIn = () => {
        this.setState({
            description: "",
            habit: false,
            eventType: "CHECK-IN",
            color: "#ef611e",
            endDate: [],
        });
    }

    /**
     * Cambia el tipo de evento a
     * un habito
     */
    changeToHabit = () => {
        this.setState({
            habit: true,
            eventType: "HABIT",
            color: "#2380d1",
        });
    }

    /**
     * change the event name
     */
    changeName = (newName) => {
        this.setState({
            name: newName,
        });
    }

    /**
     * metodo que actualiza la descripcion
     */
    updateDescription = (description) => {
        this.setState({
            description: description,
        });
    }

    /**
     * Metodo pasado al componente hijo para que 
     * actualize la hora al componente padre
     */
    updateDate = (newDate) => {
        this.setState({
            date: newDate,
        });
    }

    /**
     * actualiza la fecha de finalizacion del
     * evento
     */
    updateEnd = (newEnd) => {
        this.setState({
            endDate: newEnd,
        });
    }

    /**
     * añade un recordatorio al array 
     * de estos
     */
    addTimer = (hour) => {
        const { timers } = this.state;

        console.log("nuevo timer");
        console.log(hour);

        console.log("total timers");
        console.log(timers);

        this.setState({
            timers: [this.instanceTimer(hour), ...timers]
        });
    }

    instanceTimer = (hour) => {
        const { timers } = this.state;
        let id;

        if (timers.length > 0) {
            id = (timers[timers.length - 1]).id++;
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
     * elimina el recordatorio seleccionado
     */
    removeTimer = (timerId) => {
        this.setState({
            //filtro
            timers: this.state.timers.filter(t => t.id !== timerId),
        });
    }

    /**
     * Añade el nuevo evento a la lista y vuelve 
     * a el layout anterior
     */
    addEvent = () => {
        const { name } = this.state;
        const { navigation } = this.props;

        console.log(this.state);


        if (name.length > 0) {
            navigation.navigate("Main");
        } else {
            ToastAndroid.showWithGravity(
                "Enter a name",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

    }

    /* FUNCIONES DE RENDERIZACION */

    /**
     * Renderiza los componentes de los habitos
     */
    renderHabitsComponents = () => {
        const { date, timers, color } = this.state;

        return (
            <View style={styles.specificComponents}>
                <TextInput
                    onChangeText={this.updateDescription}
                    style={styles.descriptionInput}
                    multiline
                    placeholder={"Description"}
                    underlineColorAndroid="transparent"
                />

                <CustomDatePicker
                    updateDate={this.updateDate}
                    color={color}
                    title={"HABIT BEGIN"}
                />

                <Repeat
                    color={color}
                />

                <CustomDatePicker
                    style={{ marginBottom: 15 }}
                    updateDate={this.updateEnd}
                    color={color}
                    title={"HABIT END"}
                />

                <TimerList
                    timers={timers}
                    color={color}
                    addTimer={this.addTimer}
                    removeTimer={this.removeTimer}
                />
            </View>
        );
    }

    /**
     * Renderiza los componentes de los check-in
     */
    renderCheckInComponents = () => {
        const { date, timers, color } = this.state;

        return (
            <View style={styles.specificComponents}>
                <CustomDatePicker
                    updateDate={this.updateDate}
                    color={color}
                    title={"CHECK-IN DATE"}
                />

                <TimerList
                    timers={timers}
                    color={color}
                    addTimer={this.addTimer}
                    removeTimer={this.removeTimer}
                />
            </View>
        );
    }

    /* LAYOUT */
    render() {
        const { habit, color, eventType, date } = this.state;

        console.log("Propiedades");
        console.log(this.props);


        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.buttonsContainer}>
                        <EventTypeButton buttonName="Habit" color="#2380d1" onPress={this.changeToHabit} />
                        <EventTypeButton buttonName="Check-In" color="#ef611e" onPress={this.changeToCheckIn} />
                    </View>

                    <Pickers
                        color={color}
                    />

                    <CustomTextInput
                        placeholder="Name"
                        changeName={this.changeName}
                    />

                    {(habit)
                        ?
                        (this.renderHabitsComponents())
                        :
                        (this.renderCheckInComponents())
                    }

                    <NewEventLargueButton
                        addEvent={this.addEvent}
                        eventType={eventType}
                        color={color}
                    />
                </ScrollView>
            </SafeAreaView>
        );
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
        justifyContent: "center",
        width: '100%',
        flexDirection: "row",
        marginBottom: 15,
    },
    specificComponents: {
        marginBottom: 15,
    },
    descriptionInput: {
        backgroundColor: "#323232",
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 40,
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        color: "#dbdbdb",
        fontWeight: "bold",
    },
});