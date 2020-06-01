import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';

import WeekHeader from '../components/WeekHeader';
import AddEventButton from '../components/AddEventButton';
import EmptyDay from '../components/EmptyDay';
import TimeDay from '../components/TimeDay';

import User from '../models/user';
import { findAllByPK, updateEvent, addNewEvent, deleteSelectedEvent, getLastEventId, getFilterEvents, dateInRange, doneEvent } from '../api/EventsDAO';
import { updatePerfectDay } from '../api/UsersDAO';
import { newEvent } from '../utils/EventsUtils';

export default class Main extends React.Component {

    /* STATE && CONSTRUCTOR */
    state = {
        loading: true,
        error: false,
        selectedDate: "",
        totalEvents: [],
        events: [],
        morningEvents: [],
        afternoonEvents: [],
        nightEvents: [],
    }

    constructor(props) {
        super(props);
    }

    /* CICLO DE VIDA */

    /**
     * pedira los eventos del usuario loggeado y
     * crea la funcionalidad para los temporizadores
     */
    componentDidMount() {
        const TIME_INTERVAL = 1000; // un segundo

        // creacion de la fecha actual
        const date = new Date();
        const dateString = (date.getUTCDate() + "-" + (date.getMonth()) + "-" + date.getFullYear())

        // asignacion de la fecha actual
        this.setState({
            selectedDate: dateString,
        })

        //peticion para los eventos
        this.getUserEvents();

        // funcionalidad de los temporizadores
        this.intervalId = setInterval(() => {
            const { events, morningEvents, afternoonEvents, nightEvents } = this.state;

            this.setState({
                events: events.map(event => {
                    const { time, isRunning } = event;

                    return {
                        ...event,
                        time: (isRunning && time > 1000) ? time - TIME_INTERVAL : time,
                    };
                }),
                morningEvents: morningEvents.map(event => {
                    const { time, isRunning } = event;

                    return {
                        ...event,
                        time: (isRunning && time > 1000) ? time - TIME_INTERVAL : time,
                    };
                }),
                afternoonEvents: afternoonEvents.map(event => {
                    const { time, isRunning } = event;

                    return {
                        ...event,
                        time: (isRunning && time > 1000) ? time - TIME_INTERVAL : time,
                    };
                }),
                nightEvents: nightEvents.map(event => {
                    const { time, isRunning } = event;

                    return {
                        ...event,
                        time: (isRunning && time > 1000) ? time - TIME_INTERVAL : time,
                    };
                }),
            });
        }, TIME_INTERVAL);
    }

    /* ASYNC METHODS */

    /**
     * obtiene los eventos de el usuario loggeado
     */
    getUserEvents = async () => {
        let userEvents = await findAllByPK(User._id);
        let filteredEvents = getFilterEvents(userEvents, this.state.selectedDate);

        this.setState({
            totalEvents: userEvents,
            events: filteredEvents
        });

        this.divideEvents(filteredEvents);

        this.setState({
            loading: false,
        })
    }

    /**
     * Metodo que añade un nuevo evento al array de estos
     */
    addEvent = async (added) => {
        const { events, morningEvents, afternoonEvents, nightEvents, selectedDate } = this.state;
        const aux = {
            id: 0,
            name: added.name,
            date: added.date[0] + "-" + added.date[1] + "-" + added.date[2],
            endDate: added.endDate[0] + "-" + added.endDate[1] + "-" + added.endDate[2],
            eventType: added.eventType,
            icon: added.icon,
            color: added.color,
            totalTimes: added.totalTimes,
            totalTimesDone: 0,
            time: added.time,
            defaultTime: added.time,
            repeat: added.repeat,
            hour: added.timers[0].hour,
            timers: added.timers,
        }

        await addNewEvent(aux);

        if (dateInRange(aux, selectedDate)) {
            aux.id = await getLastEventId();

            this.setState({
                events: [...events, newEvent(aux)]
            })

            switch (true) {
                case (this.checkHour(aux.hour) == "morning"):
                    this.setState({
                        morningEvents: [newEvent(aux), ...morningEvents],
                    });
                    break;
                case (this.checkHour(aux.hour) == "afternoon"):
                    this.setState({
                        afternoonEvents: [newEvent(aux), ...afternoonEvents],
                    });
                    break;
                case (this.checkHour(aux.hour) == "night"):
                    this.setState({
                        nightEvents: [newEvent(aux), ...nightEvents],
                    });
                    break;
            }
        }

    }

    /**
     * metodo que edita el evento pasado por parametro y lo
     * actualiza en el array
     */
    editEvent = async (modifiedEvent) => {
        // modificacion en eventos globales
        this.setState(prevState => {
            const { events } = prevState;

            console.log(modifiedEvent)

            return {
                events: events.map(event => {
                    if (modifiedEvent.id === event.id) {
                        return {
                            id: modifiedEvent.id,
                            name: modifiedEvent.newName,
                            description: modifiedEvent.newDescription,
                            icon: modifiedEvent.newIcon,
                            color: modifiedEvent.newColor,
                            totalTimes: modifiedEvent.newTotalTimes,
                            totalTimesDone: (modifiedEvent.todayChecked) ? (modifiedEvent.newTotalTimes) : (0),
                            time: modifiedEvent.newTime,
                            repeat: modifiedEvent.repeat,
                            hour: modifiedEvent.hour,
                            date: modifiedEvent.newDate,
                            endDate: modifiedEvent.newEndDate,
                            timers: modifiedEvent.newTimers,
                            time: modifiedEvent.newTime,
                            hour: modifiedEvent.hour,
                            bestStreak: modifiedEvent.bestStreak,
                            actualStreak: modifiedEvent.actualStreak,
                            eventType: modifiedEvent.eventType,
                        };
                    }

                    return event;
                }),
            };
        });

        // modificacion en eventos de la mañana
        this.setState(prevState => {
            const { morningEvents } = prevState;

            return {
                morningEvents: morningEvents.map(event => {
                    if (modifiedEvent.id === event.id) {
                        return {
                            id: modifiedEvent.id,
                            name: modifiedEvent.newName,
                            description: modifiedEvent.newDescription,
                            icon: modifiedEvent.newIcon,
                            color: modifiedEvent.newColor,
                            totalTimes: modifiedEvent.newTotalTimes,
                            totalTimesDone: modifiedEvent.totalTimesDone,
                            time: modifiedEvent.newTime,
                            repeat: modifiedEvent.repeat,
                            hour: modifiedEvent.hour,
                            date: modifiedEvent.newDate,
                            endDate: modifiedEvent.newEndDate,
                            timers: modifiedEvent.newTimers,
                            time: modifiedEvent.newTime,
                            hour: modifiedEvent.hour,
                            bestStreak: modifiedEvent.bestStreak,
                            actualStreak: modifiedEvent.actualStreak,
                            eventType: modifiedEvent.eventType,
                        };
                    }

                    return event;
                }),
            };
        });

        // modificacion en eventos de la tarde
        this.setState(prevState => {
            const { afternoonEvents } = prevState;

            return {
                afternoonEvents: afternoonEvents.map(event => {
                    if (modifiedEvent.id === event.id) {
                        return {
                            id: modifiedEvent.id,
                            name: modifiedEvent.newName,
                            description: modifiedEvent.newDescription,
                            icon: modifiedEvent.newIcon,
                            color: modifiedEvent.newColor,
                            totalTimes: modifiedEvent.newTotalTimes,
                            totalTimesDone: modifiedEvent.totalTimesDone,
                            time: modifiedEvent.newTime,
                            repeat: modifiedEvent.repeat,
                            hour: modifiedEvent.hour,
                            date: modifiedEvent.newDate,
                            endDate: modifiedEvent.newEndDate,
                            timers: modifiedEvent.newTimers,
                            time: modifiedEvent.newTime,
                            hour: modifiedEvent.hour,
                            bestStreak: modifiedEvent.bestStreak,
                            actualStreak: modifiedEvent.actualStreak,
                            eventType: modifiedEvent.eventType,
                        };
                    }

                    return event;
                }),
            };
        });

        // modificacion en eventos de la noche
        this.setState(prevState => {
            const { nightEvents } = prevState;

            return {
                nightEvents: nightEvents.map(event => {
                    if (modifiedEvent.id === event.id) {
                        return {
                            id: modifiedEvent.id,
                            name: modifiedEvent.newName,
                            description: modifiedEvent.newDescription,
                            icon: modifiedEvent.newIcon,
                            color: modifiedEvent.newColor,
                            totalTimes: modifiedEvent.newTotalTimes,
                            totalTimesDone: modifiedEvent.totalTimesDone,
                            time: modifiedEvent.newTime,
                            repeat: modifiedEvent.repeat,
                            hour: modifiedEvent.hour,
                            date: modifiedEvent.newDate,
                            endDate: modifiedEvent.newEndDate,
                            timers: modifiedEvent.newTimers,
                            time: modifiedEvent.newTime,
                            hour: modifiedEvent.hour,
                            bestStreak: modifiedEvent.bestStreak,
                            actualStreak: modifiedEvent.actualStreak,
                            eventType: modifiedEvent.eventType,
                        };
                    }

                    return event;
                }),
            };
        });

        // PUT EN EL API
        await updateEvent(modifiedEvent);
    }

    /**
     * elimina el evento el cual la id coincide con la que
     * se ha pasado por parametro
     */
    deleteEvent = async (selectedEvent) => {
        this.setState({
            events: this.state.events.filter(event => event.id !== selectedEvent),
            morningEvents: this.state.morningEvents.filter(event => event.id !== selectedEvent),
            afternoonEvents: this.state.afternoonEvents.filter(event => event.id !== selectedEvent),
            nightEvents: this.state.nightEvents.filter(event => event.id !== selectedEvent),
        });

        await deleteSelectedEvent(selectedEvent)
    }

    /* METODOS DE AYUDA */

    /**
     * Devuelve morning, afternoon o night dependiendo
     * de la hora que se le pase por parametro.
     * @param {*} hour: Hora en formato de string 
     */
    checkHour(hour) {
        let check = "";
        hour = parseInt(hour.charAt(0) + hour.charAt(1));

        switch (true) {
            case ((hour >= 6) && (hour < 12)):
                check = "morning";
                break;
            case ((hour >= 12) && (hour < 19)):
                check = "afternoon";
                break;
            case (((hour >= 19) && (hour <= 23)) || (hour >= 0) && (hour <= 6)):
                check = "night";
                break;
        }

        return check;
    }

    /**
     * Metodo que divide eventos en distintos 
     * arrays de franjas horarias   
     * @param {*} events: eventos totales para dividir
     */
    divideEvents(events) {
        const { morningEvents, afternoonEvents, nightEvents } = this.state;

        events.forEach(event => {
            switch (true) {
                case (this.checkHour(event.hour) == "morning"):
                    morningEvents.push(event)
                    break;
                case (this.checkHour(event.hour) == "afternoon"):
                    afternoonEvents.push(event)
                    break;
                case (this.checkHour(event.hour) == "night"):
                    nightEvents.push(event)
                    break;
            }
        });
    }

    /* METODOS PARA LOS EVENTOS */

    /**
     * cambia la fecha seleccionada y filtra los eventos 
     * a los de el dia cambiado
     */
    changeSelectedDay = (changedDate) => {
        this.setState({
            selectedDate: changedDate,
            loading: true,
            totalEvents: [],
            events: [],
            morningEvents: [],
            afternoonEvents: [],
            nightEvents: [],
        })

        this.getUserEvents()
    }

    /**
     * metodo que cumple el evento clicado y lo edita en
     * los arrays
     */
    addTotalTimeCounter = async (event, quantity) => {
        const { events, morningEvents, afternoonEvents, nightEvents } = this.state;
        let done = false;
        let perfectDay = true;
        let aux = [];
        let morning = [];
        let after = [];
        let night = [];
        let value = 0;

        console.log(event)

        //comprobacion si el evento ha terminado
        if (quantity != event.totalTimes) {
            if (quantity == 1) {
                if ((event.totalTimesDone + 1) <= event.totalTimes) {
                    value = event.totalTimesDone + 1;
                } else {
                    value = event.totalTimesDone;
                }
            } else {
                if ((event.totalTimesDone + quantity) <= event.totalTimes) {
                    value = event.totalTimesDone + quantity;
                } else {
                    value = event.totalTimes;
                }
            }
        } else {
            value = event.totalTimes;
        }

        // update en la base de datos
        done = (value == event.totalTimes)
        if (done && !event.todayChecked) {
            event.todayChecked = done;
            event.actualStreak++;
            (event.actualStreak > event.bestStreak) && (event.bestStreak = event.actualStreak);
            event.totalTimesChecked++;

            //comprobar perfect day
            events.forEach(event => {
                if (perfectDay && event.todayChecked) {
                    perfectDay = true;
                } else {
                    perfectDay = false;
                }
            });

            await doneEvent(event)

            if (perfectDay) {
                await updatePerfectDay(User._id)
            }
        }

        // update en el front end
        events.forEach((e, i) => {
            if (e.id == event.id) {
                e.totalTimesDone = value;
            }
            aux = [...aux, e];
        });

        morningEvents.forEach((e, i) => {
            if (e.id == event.id) {
                e.totalTimesDone = value;
            }
            morning = [...morning, e];
        });

        afternoonEvents.forEach((e, i) => {
            if (e.id == event.id) {
                e.totalTimesDone = value;
            }
            after = [...after, e];
        });

        nightEvents.forEach((e, i) => {
            if (e.id == event.id) {
                e.totalTimesDone = value;
            }
            night = [...night, e];
        });

        this.setState({
            events: aux,
            morningEvents: morning,
            afternoonEvents: after,
            nightEvents: night,
        })
    }

    /**
     * inicia o para el cronometro del evento pasado por 
     * parametro
     */
    startStopCounter = (eventId) => {
        this.setState(prevState => {
            const { events, morningEvents, afternoonEvents, nightEvents } = prevState;

            /* devuelve los mismos cronometros pero
            modifica el valor de isRunning al
            inverso del timer que se ha seleccionado */
            return {
                events: events.map(event => {
                    const { id, isRunning } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            isRunning: !isRunning,
                        };
                    }

                    return event;
                }),
                morningEvents: morningEvents.map(event => {
                    const { id, isRunning } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            isRunning: !isRunning,
                        };
                    }

                    return event;
                }),
                afternoonEvents: afternoonEvents.map(event => {
                    const { id, isRunning } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            isRunning: !isRunning,
                        };
                    }

                    return event;
                }),
                nightEvents: nightEvents.map(event => {
                    const { id, isRunning } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            isRunning: !isRunning,
                        };
                    }

                    return event;
                }),
            };
        });
    }

    /**
     * devuelve el valor que tenia previamente el cronometro
     */
    restartCounter = (eventId) => {
        this.setState(prevState => {
            const { events, morningEvents, afternoonEvents, nightEvents } = prevState;

            /* devuelve los mismos cronometros pero
            modifica el valor de time al del principio
            de iniciarlo */
            return {
                events: events.map(event => {
                    const { id, defaultTime } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            time: defaultTime,
                        };
                    }

                    return event;
                }),
                morningEvents: morningEvents.map(event => {
                    const { id, defaultTime } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            time: defaultTime,
                        };
                    }

                    return event;
                }),
                afternoonEvents: afternoonEvents.map(event => {
                    const { id, defaultTime } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            time: defaultTime,
                        };
                    }

                    return event;
                }),
                nightEvents: nightEvents.map(event => {
                    const { id, defaultTime } = event;

                    if (id === eventId) {
                        return {
                            ...event,
                            time: defaultTime,
                        };
                    }

                    return event;
                }),
            };
        });
    }

    /* LAYOUT */
    render() {
        const {
            events,
            morningEvents,
            afternoonEvents,
            nightEvents,
            loading,
            error,
            selectedDate,
        } = this.state;
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.staticHeader}>
                    <WeekHeader
                        selectedDate={selectedDate}
                        changeSelectedDay={this.changeSelectedDay}
                    />
                </View>
                {
                    (loading) ?
                        (
                            <SafeAreaView style={styles.loadingContainer}>
                                <StatusBar barStyle="dark-content" />
                                <ActivityIndicator
                                    animating={loading}
                                    color="14ffec"
                                    size="large"
                                />
                            </SafeAreaView>
                        )
                        :
                        (
                            <SafeAreaView style={styles.container} >
                                <ScrollView>
                                    {(events.length <= 0) ?
                                        (
                                            <EmptyDay />
                                        )
                                        :
                                        (
                                            <View style={styles.dayContainer}>
                                                <TimeDay
                                                    moment={"morning"}
                                                    events={morningEvents}
                                                    navigation={navigation}
                                                    addTotalTimeCounter={this.addTotalTimeCounter}
                                                    startStopCounter={this.startStopCounter}
                                                    restartCounter={this.restartCounter}
                                                    editEvent={this.editEvent}
                                                    deleteEvent={this.deleteEvent}
                                                />
                                                <TimeDay
                                                    moment={"afternoon"}
                                                    events={afternoonEvents}
                                                    navigation={navigation}
                                                    addTotalTimeCounter={this.addTotalTimeCounter}
                                                    startStopCounter={this.startStopCounter}
                                                    restartCounter={this.restartCounter}
                                                    editEvent={this.editEvent}
                                                    deleteEvent={this.deleteEvent}
                                                />
                                                <TimeDay
                                                    moment={"night"}
                                                    events={nightEvents}
                                                    navigation={navigation}
                                                    addTotalTimeCounter={this.addTotalTimeCounter}
                                                    startStopCounter={this.startStopCounter}
                                                    restartCounter={this.restartCounter}
                                                    editEvent={this.editEvent}
                                                    deleteEvent={this.deleteEvent}
                                                />
                                            </View>
                                        )}
                                </ScrollView>
                                <View style={styles.addEvent} >
                                    <AddEventButton addEvents={this.addEvent} navigation={navigation} />
                                </View>
                            </SafeAreaView >
                        )}
            </SafeAreaView >

        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 30,
        backgroundColor: "#212121",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        backgroundColor: "#212121",
    },
    dayContainer: {
        flex: 1,
    },
    addEvent: {
        position: "absolute",
        bottom: '3%',
        left: '82%'
    }
});
