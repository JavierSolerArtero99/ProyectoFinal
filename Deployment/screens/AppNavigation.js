import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from './Main';
import LoginScreen from './LoginScreen';
import Stats from './Stats';
import Settings from './Settings';
import NewEvent from './NewEvent';
import DetailEventScreen from './DetailEventScreen';

/* VARIABLES DE NAVEGACION */
const Tab = createMaterialBottomTabNavigator(); // navegacion de la app
const MainStackNavigation = createStackNavigator();    // pantalla main
const LoginStackNavigation = createStackNavigator(); // navegacion para el login

/* NAVEGACION PRINCIPAL */

/**
 * Tiene el Login como layout principal y el Main esta declarado
 * para cuando la pantalla de Login haga un login correcto se 
 * lanzara la Screen con el bottom tab navigation
 */
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <LoginStackNavigation.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false
                }}
            >
                <LoginStackNavigation.Screen name="Login" component={getLoginScreen} />
                <LoginStackNavigation.Screen name="Main" component={getMainBottomStack} />
            </LoginStackNavigation.Navigator>
        </NavigationContainer>
    );
}

/**
 * devuelve el layout de la main screen con el bottom tab navigation
 * una vez que se hace el login correctamente
 * @param {*} param0 
 */
function getMainBottomStack({ route, navigation }) {
    return (
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
    )
}

/* NAVEGACION PANTALLA MAIN */

/**
 * navegacion de la pantalla principal, aqui estan todos los
 * componentes para navegar en la pantalla principal (Main)
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
            <MainStackNavigation.Screen name="DetailEvent" component={getDetailEventScreen} />
        </MainStackNavigation.Navigator>
    );
}

/* SCREENS */

/**
 * Obtiene el MainScreen
 * @param {*} param0 
 */
function getMainScreen({ route, navigation }) {
    return (
        <Main navigation={navigation} route={route} />
    );
}

/**
 * Obtiene el addEventScreen
 * @param {*} param0 
 */
function getAddEventScreen({ route, navigation }) {
    return (
        <NewEvent navigation={navigation} route={route} />
    );
}

/**
 * Obtiene el DetailEventScreen
 * @param {*} param0 
 */
function getDetailEventScreen({ route, navigation }) {
    return (
        <DetailEventScreen navigation={navigation} route={route} />
    );
}

/**
 * Obtiene el componente del loggin screen
 * @param {*} param0 
 */
function getLoginScreen({ route, navigation }) {
    return (
        <LoginScreen navigation={navigation} route={route} />
    );
}


/**
 * pantalla de stats
 * @param {} param0 
 */
function StatsScreen({ route, navigation }) {
    return (
        <Stats navigation={navigation} route={route} />
    );
}

/**
 * pantalla de settings
 * @param {} param0 
 */
function SettingsScreen({ route, navigation }) {
    return (
        <Settings navigation={navigation} route={route} />
    );
}