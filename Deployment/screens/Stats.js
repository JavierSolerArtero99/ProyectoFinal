import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';

export default class Stats extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    
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