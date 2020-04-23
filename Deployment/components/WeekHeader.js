import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class WeekHeader extends React.Component {
    /* STATE && CONSTRUCTOR */
    state = {
        weekDays: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        today: "",
        currentWeek: []
    }

    constructor(props) {
        super(props);
    }

    /* CICLO DE VIDA */

    /**
     * Obtiene los dias del mes de toda la 
     * semana actual
     */
    componentDidMount() {
        let date = new Date
        let week = []
        let currentDay = parseInt(((date.toString()).split(' '))[2]);

        console.log(date);
        

        for (let i = 1; i <= 7; i++) {
            let first = date.getDate() - date.getDay() + i
            let day = new Date(date.setDate(first)).toISOString().slice(0, 10)
            week.push(day.charAt(8) + day.charAt(9))
        }

        this.setState({
            currentWeek: week,
            today: currentDay
        });
    }

    /* METODOS PARA RENDERIZADO */    

    /**
     * Renderiza el nombre de los dias de la
     * semana
     * @param {} weekDays: dias de la semana del state
     */
    renderWeek(weekDays) {
        return weekDays.map((day) => {
            return (
                <View style={styles.day}>
                    <Text style={styles.dayText}>{day}</Text>
                </View>
            )
        })
    }

    /**
     * Renderiza el dia del mes
     * @param {*} currentWeek: 
     * @param {*} today 
     */
    renderWeekDays(currentWeek, today) {
        console.log(currentWeek);
        
        return currentWeek.map((day, index) => {
            return (
                <TouchableOpacity style={styles.day}>
                    <Text style={[styles.dayText, this.gsCurrentDayText(day, today)]}>{day}</Text>
                    {(day == today) && (
                    <View style={styles.currentDay}/>
                )}
                </TouchableOpacity>)
        });
    }

    /* ESTILO CONDICIONAL */

    /**
     * Metodo que cambia el estilo del dia del mes en que estemos
     * si es hoy
     * @param {*} currentDay: dia actual que recorre el array
     * @param {*} today: dia actual
     */
    gsCurrentDayText(currentDay, today) {
        console.log("entra");
        console.log(currentDay + " " + today);

        
        if (currentDay == today) {
            return {fontSize: 18, color: "#14ffec"}
        }
    }

    /* LAYOUT */
    render() {
        const { weekDays, currentWeek, today } = this.state;

        return (
            <View style={styles.container} >
                <View style={styles.dayContainer}>{this.renderWeek(weekDays)}</View>
                <View style={styles.dayContainer}>{this.renderWeekDays(currentWeek, today)}</View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        borderRadius: 10,
        flexDirection: "column",
        backgroundColor: "#323232",
    },
    dayContainer: {
        flex: 1,
        flexDirection: "row"
    },
    day: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    dayText: {
        fontWeight: "bold",
        color: "#dbdbdb"
    },
    currentDayText: {
        fontSize: 3,
    },
    currentDay: {
        backgroundColor: "#14ffec",
        borderRadius: 50,
        height: 5,
        width: 5,
    }
});
