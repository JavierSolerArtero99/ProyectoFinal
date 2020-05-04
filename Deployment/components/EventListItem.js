import React from 'react';
import { View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import LeftSwipeButton from './LeftSwipeButtons';

export default class EventListItem extends React.Component {
    /* CONSTRUCTOR */
    constructor(props) {
        super(props)
    }

    /* LAYOUT */
    render() {
        const { event } = this.props;
        console.log("===renderizando item:===");
        console.log(event);
        
        //left buttons
        const leftButton = (
            <SwipeButtonsContainer
                style={styles.swipeButtonsContainer}
            >
                <LeftSwipeButton event={event} />
            </SwipeButtonsContainer>
        );

        return (
            //container con el swipe item
            <SwipeItem
                style={{ flex: 1 }}
                leftButtons={leftButton}
            >
                <TouchableOpacity>
                    <View style={styles.eventContainer}>
                        <Image
                            source={require('../icons/add.png')}
                            style={styles.icon}
                        />
                        <View style={styles.description}>
                            <View>
                                <Text style={styles.eventName}>{event.name}</Text>
                                <Text style={styles.eventHour}>{event.hour}</Text>
                            </View>
                            <View>
                                {/* aqui iria el recuento y mas aspectos del shorcut del evento */}
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
        borderRadius: 15,
        marginBottom: 8,
        flexDirection: "row",
        padding: 10,
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
});
