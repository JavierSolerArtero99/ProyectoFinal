import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './Main';
import Stats from './Stats';
import Settings from './Settings';
import NewEvent from './NewEvent';

/* VARIABLES DE NAVEGACION */
const Tab = createBottomTabNavigator(); // navegacion de la app
const MainStackNavigation = createStackNavigator();    // pantalla main

/* NAVEGACION PRINCIPAL */

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                // tabBarOptions
                initialRouteName="Main"
            >
                <Tab.Screen name="Main" component={MainStack} />
                <Tab.Screen name="Stats" component={StatsScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

/* NAVEGACION PANTALLA MAIN */

/**
 * pantalla principal
 * @param {} param0 
 */
function MainStack({ route, navigation }) {
    return (
        <MainStackNavigation.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <MainStackNavigation.Screen name="Main" component={getMainScreen} />
            <MainStackNavigation.Screen name="AddEvent" component={getAddEventScreen} />
        </MainStackNavigation.Navigator>
    );
}

function getMainScreen({ route, navigation }) {
    return (
        <Main navigation={navigation} route={route} />
    );
}

function getAddEventScreen({ route, navigation }) {
    return (
        <NewEvent navigation={navigation} route={route} />
    );
}

/* STATS */

/**
 * pantalla de stats
 * @param {} param0 
 */
function StatsScreen({ route, navigation }) {
    return (
        <Stats navigation={navigation} route={route} />
    );
}

/* SETTINGS */

/**
 * pantalla de settings
 * @param {} param0 
 */
function SettingsScreen({ route, navigation }) {
    return (
        <Settings navigation={navigation} route={route} />
    );
}