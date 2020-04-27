import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';

import EventTypeButton from '../components/NewEventComponents/EventTypeButton';
import CustomTextInput from '../components/NewEventComponents/CustomTextInput';
import Pickers from '../components/NewEventComponents/Pickers';
import NewEventLargueButton from '../components/NewEventComponents/NewEventLargueButon';
import CustomDatePicker from '../components/NewEventComponents/CustomDatePicker';

export default class NewEvent extends React.Component {
    /* CONSTRUCTOR && STATE */
    state = {
        // view state
        habit: true,
        eventType: "HABIT",
        date: [],
        color: "#2380d1",
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
     * Metodo pasado al componente hijo para que 
     * actualize la hora al componente padre
     */
    updateDate = (newDate) => {
        this.setState({
            date: newDate,
        });        
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
        const { date } = this.state;
        
        return (
            <View style={styles.specificComponents}>
                <CustomDatePicker 
                    updateDate={this.updateDate}
                />
            </View>
        );
    }

    /* LAYOUT */
    render() {
        const { habit, color, eventType, date } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <EventTypeButton buttonName="Check-In" color="#ef611e" onPress={this.changeToCheckIn} />
                    <EventTypeButton buttonName="Habit" color="#2380d1" onPress={this.changeToHabit} />
                </View>

                <CustomTextInput placeholder="Name" />
                <Pickers color={color} />

                {(habit)
                    ?
                    (this.renderHabitsComponents())
                    :
                    (this.renderCheckInComponents())
                }

                <NewEventLargueButton
                    eventType={eventType}
                    color={color}
                />
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