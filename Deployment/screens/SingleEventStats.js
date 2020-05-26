import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Button, TouchableHighlight } from 'react-native';

export default class SingleEventStats extends React.Component {

    /* STATE */
    state = {
        
    }

    /* EVENTOS */

    /**
    * va al layout de detalle del evento
    */
    goDetailEvent = () => {
        const { event, navigation, editEvent, deleteEvent } = this.props.route.params.params;
        navigation.navigate("DetailEvent", { params: { navigation, event, editEvent, deleteEvent } });
    }

    /* LAYOUT */
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text>eventos!!</Text>
                    <TouchableHighlight onPress={this.goDetailEvent}>
                        <Text>detalles</Text>
                    </TouchableHighlight>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 30,
        backgroundColor: "#212121",
        justifyContent: "center",
    }
});