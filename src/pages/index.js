import React from 'react';
import { Login } from './Login';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function StackNav() {
    return (
        <Stack.Navigator
            screenOptions={{ header: () => null }}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}

export default StackNav;