import React from 'react';
import { View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

export default class EventListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { event } = this.props;

        return (
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
                            {/* aqui iria el recuento */}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
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
