import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from './Main';
import Stats from './Stats';
import Settings from './Settings';
import NewEvent from './NewEvent';

/* VARIABLES DE NAVEGACION */
const Tab = createMaterialBottomTabNavigator(); // navegacion de la app
const MainStackNavigation = createStackNavigator();    // pantalla main

/* NAVEGACION PRINCIPAL */

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Main"
                activeColor="#14ffec"
                inactiveColor="#dbdbdb"
                barStyle={{ backgroundColor: '#434343' }}
            >
                <Tab.Screen
                    name="Stats"
                    component={StatsScreen}
                    options={{
                        tabBarLabel: 'Analytics',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="google-analytics" color={color} size={26} />
                        ),
                      }}
                />
                <Tab.Screen
                    name="Main"
                    component={MainStack}
                    options={{
                        tabBarLabel: 'My Habits',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="home-circle" color={color} size={26} />
                        ),
                      }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="settings-outline" color={color} size={26} />
                        ),
                      }}
                />
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