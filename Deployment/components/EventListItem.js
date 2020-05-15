import React from 'react';
import { View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import LeftSwipeButton from './LeftSwipeButtons';
import LeftSwipeCounterButton from './LeftSwipeCounterButton';
import RightSwipeButtons from './RightSwipeButtons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EventCounter from './EventCounter';
import EventStopWatch from './EventStopwatch';
import LeftSwipeStopwatchButton from './NewEventComponents/LeftSwipeStopwatchButton';

export default class EventListItem extends React.Component {
    /* CONSTRUCTOR */
    constructor(props) {
        super(props)
    }

    /* METODOS DE RENDERIZACION */

    /**
     * Obtiene los botones de la parte izquierda 
     * dependiendo de los tipos de parametros utilzados 
     */
    getLeftButtons = (event) => {
        const { addTotalTimeCounter } = this.props;
        let leftButton;

        if (event.totalTimes > 1) {
            // contador
            leftButton = (
                <SwipeButtonsContainer
                    style={styles.swipeButtonsContainer}
                >
                    <LeftSwipeButton
                        event={event}
                        color={event.color}
                        addTotalTimeCounter={addTotalTimeCounter}
                    />
                    <LeftSwipeCounterButton
                        event={event}
                        color={event.color}
                        count={"+1"}
                        addTotalTimeCounter={addTotalTimeCounter}
                        quantity={1}
                    />
                    <LeftSwipeCounterButton
                        event={event}
                        color={event.color}
                        addTotalTimeCounter={addTotalTimeCounter}
                        count={"+" + Math.floor(event.totalTimes / 2 + 1)}
                        quantity={Math.floor(event.totalTimes / 2 + 1)} />
                </SwipeButtonsContainer>
            );

        } else {
            if (event.time > 0) {
                // cronometro
                leftButton = (
                    <SwipeButtonsContainer
                        style={styles.swipeButtonsContainer}
                    >
                        <LeftSwipeButton
                            event={event}
                            color={event.color}
                            addTotalTimeCounter={addTotalTimeCounter}
                        />
                        <LeftSwipeStopwatchButton
                            event={event}
                            color={event.color}
                            icon={"play-pause"}
                            addTotalTimeCounter={addTotalTimeCounter}
                            startStopCounter={this.props.startStopCounter}
                        />
                        <LeftSwipeStopwatchButton
                            event={event}
                            color={event.color}
                            icon={"restart"}
                        />
                    </SwipeButtonsContainer>
                );

            } else {
                // check
                leftButton = (
                    <SwipeButtonsContainer
                        style={styles.swipeButtonsContainer}
                    >
                        <LeftSwipeButton event={event} color={event.color} addTotalTimeCounter={addTotalTimeCounter} />
                    </SwipeButtonsContainer>
                );
            }
        }

        return leftButton;
    }

    /**
     * Obtiene los botones de la parte derecha 
     * dependiendo de los tipos de parametros utilzados 
     */
    getRightButtons = (event) => {
        let rightButton;
        if (event.totalTimes > 0) {
            // contador
            rightButton = (
                <SwipeButtonsContainer
                    style={styles.swipeButtonsContainer}
                >
                    <RightSwipeButtons event={event} color={event.color} />
                </SwipeButtonsContainer>
            );

        } else {
            if (event.time > 0) {
                // cronometro
                rightButton = (
                    <SwipeButtonsContainer
                        style={styles.swipeButtonsContainer}
                    >
                        <RightSwipeButtons event={event} color={event.color} />
                    </SwipeButtonsContainer>
                );

            } else {
                // check
                rightButton = (
                    <SwipeButtonsContainer
                        style={styles.swipeButtonsContainer}
                    >
                        <RightSwipeButtons event={event} color={event.color} />
                    </SwipeButtonsContainer>
                );
            }
        }

        return rightButton;
    }

    /**
     * renderiza los componentes especificos
     * dependiendo si tiene un cronometro o
     * tiene un contador
     */
    renderSpecificComponents = () => {
        const { event, time, addTotalTimeCounter } = this.props;

        let specificComponent;

        switch (true) {
            case (event.totalTimes == 1 && event.time == 0):
                // componente con cronometro
                specificComponent = (
                    <View></View>
                );
                break;
            case (event.totalTimes > 1 && event.time == 0):
                // componente con contador
                specificComponent = (
                    <EventCounter
                        event={event}
                    />
                );
                break;
            case (event.totalTimes == 1 && event.time >= 0):
                // componente con cronometro
                specificComponent = (
                    <EventStopWatch
                        event={event}
                        time={time}
                        addTotalTimeCounter={addTotalTimeCounter}
                    />
                );
                break;
        }

        return (specificComponent);
    }

    /* METODOS AUXILIARES */

    /**
     * va al layout de detalle del evento
     */
    goDetailEvent = () => {
        const { event, navigation, editEvent } = this.props;
        navigation.navigate("DetailEvent", { params: { navigation, event, editEvent } });
    }

    /* LAYOUT */
    render() {
        const { event, navigation } = this.props;

        //left buttons
        let leftButton = this.getLeftButtons(event);
        let rightButton = this.getRightButtons(event);

        return (
            //container con el swipe item
            <SwipeItem
                style={{ flex: 1 }}
                leftButtons={leftButton}
                rightButtons={rightButton}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.goDetailEvent}
                >
                    <View style={[styles.eventContainer, (event.totalTimesDone == event.totalTimes) && (styles.doneEventContainer)]}>
                        <MaterialCommunityIcons name={event.icon} color={(event.totalTimesDone == event.totalTimes) ? ("#434343") : (event.color)} size={26} />
                        <View style={styles.description}>
                            <View>
                                <Text style={[styles.eventName, (event.totalTimes==event.totalTimesDone)&&({color:"#434343", textDecorationLine: "line-through"})]}>{event.name}</Text>
                                <Text style={[styles.eventHour, (event.totalTimes==event.totalTimesDone)&&({color:"#434343", textDecorationLine: "line-through"})]}>{event.hour}</Text>
                            </View>
                            <View style={styles.specificComponents}>
                                {this.renderSpecificComponents()}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </SwipeItem>
        );
    }
}

const styles = StyleSheet.create({
    swipeButtonsContainer: {
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'row',
        padding: 10,
    },
    eventContainer: {
        backgroundColor: "#434343",
        alignItems: "center",
        borderRadius: 15,
        marginBottom: 8,
        flexDirection: "row",
        padding: 10,
    },
    doneEventContainer: {
        backgroundColor: "#323232",
    },
    icon: {
        width: 45,
        height: 45,
        resizeMode: "contain",
    },
    description: {
        flexDirection: "row",
    },
    eventName: {
        fontWeight: "bold",
        fontSize: 19,
        marginLeft: 15,
        color: "#dbdbdb"
    },
    eventHour: {
        fontWeight: "bold",
        fontSize: 12,
        marginLeft: 15,
        color: "#dbdbdb"
    },
    specificComponents: {
        alignItems: "flex-end",
        flex: 1,
        marginRight: 40,
        justifyContent: "center",
    },
});
