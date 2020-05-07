import React from 'react';
import { View, Image, StyleSheet, Text, TextInput } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class DetailEventScreen extends React.Component {

    /* CONSTRUCTOR */

    constructor(props) {
        super(props)
    }

    /* LAYOUT */
    render() {
        const { event } = this.props.route.params.params;
        console.log("===Se mostraran los detalles del evento:===")
        console.log(event);

        const home = event.icon;

        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.viewContainer} >
                    <MaterialCommunityIcons name={event.icon} color={event.color} size={60} />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={{ marginRight: 80 }} >
                            <MaterialCommunityIcons name="pencil" color={event.color} size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <MaterialCommunityIcons name="trash-can-outline" color={event.color} size={30} />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.name}
                        placeholder={event.name}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />

                    <TextInput
                        style={styles.description}
                        multiline
                        placeholder={event.description}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />

                    {/* {(habit)
                        ?
                        (this.renderHabitsComponents())
                        :
                        (this.renderCheckInComponents())
                    } */}
                </View>
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
    viewContainer: {
        marginTop: 30,
        alignItems: "center",
    },
    buttonsContainer: {
        flexDirection: "row"
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