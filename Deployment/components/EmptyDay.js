import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function EmptyDay() {

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/perezoso.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Todavia no tienes ningun habito ni tarea. Empieza ahora mismo!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30,
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 30,
        marginBottom: 20
    },
    text: {
        fontWeight: "bold",
        color: "#dbdbdb",
        textAlign: "center"
    }
});
