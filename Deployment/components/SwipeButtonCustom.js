import React from 'react';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function SwipeButtonCustom() {

    const leftButton = (
        <SwipeButtonsContainer
            style={{
                alignSelf: 'center',
                aspectRatio: 1,
                flexDirection: 'column',
                padding: 10,
            }}
        >
            <TouchableOpacity
                onPress={() => console.log('left button clicked')}
            >
                <Text>Click me !</Text>
            </TouchableOpacity>
        </SwipeButtonsContainer>
    );

    return (
        <SwipeItem
            style={styles.button}
            swipeContainerStyle={styles.swipeContentContainerStyle}
            leftButtons={leftButton}
        >
            <Text>
                Swipe me!
            </Text>
        </SwipeItem>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: 100,
        alignSelf: 'center',
        marginVertical: 5,
    },
    swipeContentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
    }
});