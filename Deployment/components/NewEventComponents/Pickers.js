import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Pickers(props) {

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <View style={styles.circle}>
                    <View style={styles.icon}></View>
                </View>
                <Text style={styles.pickerText}>Icon</Text>
            </View>
            <View style={styles.pickerContainer}>
                <View style={styles.circle}>
                    <TouchableOpacity style={[styles.color, { backgroundColor: props.color }]}></TouchableOpacity>
                </View>
                <Text style={styles.pickerText}>Color</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        marginLeft: 10,
        marginRight: 10
    },
    pickerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    circle: {
        borderRadius: 50,
        width: 45,
        height: 45,
        marginRight: 10,
        backgroundColor: "#323232",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {

    },
    color: {
        width: 24, 
        height: 24,
        borderRadius: 50,
        backgroundColor: "red",
    },
    pickerText: {
        color: "#dbdbdb",
        fontWeight: "bold",
        fontSize: 15,
    }
});