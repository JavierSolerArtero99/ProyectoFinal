import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ToastAndroid } from 'react-native';

import EventTypeButton from '../components/NewEventComponents/EventTypeButton';
import CustomTextInput from '../components/NewEventComponents/CustomTextInput';
import Pickers from '../components/NewEventComponents/Pickers';
import NewEventLargueButton from '../components/NewEventComponents/NewEventLargueButon';
import CustomDatePicker from '../components/NewEventComponents/CustomDatePicker';
import TimerList from '../components/NewEventComponents/TimerList';
import { ScrollView } from 'react-native-gesture-handler';

export default class NewEvent extends React.Component {
    /* CONSTRUCTOR && STATE */
    state = {
        // view state
        name: "",
        habit: true,
        eventType: "HABIT",
        date: [],
        color: "#2380d1",
        timers: [
            {
                id: 1,
                hour: "10:00",
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
            habit: false,
            eventType: "CHECK-IN",
            color: "#ef611e",
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
     * Metodo pasado al componente hijo para que 
     * actualize la hora al componente padre
     */
    updateDate = (newDate) => {
        this.setState({
            date: newDate,
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

        let newTimer = {
            id: (timers[timers.length - 1]).id++,
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

        if(name.length > 0) {
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
        return (
            <View style={styles.specificComponents}>
                <Text>habito</Text>
            </View>
        );
    }

    /**
     * Renderiza los componentes de los check-in
     */
    renderCheckInComponents = () => {
        const { date, timers, color, removeTimer } = this.state;

        return (
            <View style={styles.specificComponents}>
                <CustomDatePicker
                    updateDate={this.updateDate}
                    color={color}
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

                    <CustomTextInput
                        placeholder="Name"
                        changeName={this.changeName}
                    />
                    <Pickers color={color} />

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
});