import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Main from './Main';

function SettingsScreen({ route, navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{route.params.item}</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function MainStackNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                // tabBarOptions
                initialRouteName="Main"
            >
                <Tab.Screen name="Main" component={Main} />
                <Tab.Screen name="Stats" component={Main} />
                <Tab.Screen name="Settings" component={Main} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}