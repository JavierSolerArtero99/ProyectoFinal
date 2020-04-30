import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const colors = [
    "#14ffec",
    "#ff005a",
    "#4ad869",
    "#ef611e",
    "#2380d1",
    "#ffc801",
];

function changeColor(props) {
    const { color, updateColor } = props;
    let index;

    for (let i = 0; i < color.length; i++) {
        if (colors[i] == color) {
            index = i;
        }
    }

    if ((index + 1) > colors.length - 1) {
        index = 0;
    } else {
        index++;
    }

    updateColor(colors[index]);
}

/**
 * Pickers que seleccionan un color i un icono para el nuevo evento
 * @param {*} props 
 */
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
                    <TouchableOpacity
                        onPress={() => { changeColor(props) }}
                        style={[styles.color, { backgroundColor: props.color }]}
                    ></TouchableOpacity>
                </View>
                <Text style={styles.pickerText}>Color</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 15,
        marginLeft: 15,
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