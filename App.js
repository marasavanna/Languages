/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WordsScreen from './words-screen/WordsScreen';
import AddScreenForm from './add-screen/AddScreenForm';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={WordsScreen}/>
                <Stack.Screen name="AddWord" component={AddScreenForm}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
