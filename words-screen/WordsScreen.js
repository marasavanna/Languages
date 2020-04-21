import React, {useEffect} from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity, View,
} from 'react-native';

import WordsFlatList from './WordsFlatList';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WordsScreen = ({navigation}) => {
    const navigateToAddScreen = () => {
        navigation.navigate('AddWord');
    };

    return <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={{flex: 1}}>
            <WordsFlatList navigation={navigation}/>
            <TouchableOpacity style={styles.fab} onPress={navigateToAddScreen}>
                <Ionicons name="ios-add" size={40} color={'white'}/>
            </TouchableOpacity>
        </SafeAreaView>
    </>;
};

const styles = StyleSheet.create({
    fab: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 24,
        right: 24,
        flex: 1,
        borderColor: '#414442',
        backgroundColor: '#414442',
        borderRadius: 50,
    },
});

export default WordsScreen;
