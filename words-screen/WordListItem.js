import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


const WordListItem = ({type, title, subtitle, sentence}) => {

    const getLabelColor = () => {
        switch (type) {
            case 'M':
                return '#CC2811';
            case 'F':
                return '#2EA855';
            case 'V':
                return '#235493';
            case 'A':
                return '#900C3F';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.genderM, {color: getLabelColor()}]}>
                {type}{' '}
            </Text>
            <View style={styles.container_text}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{subtitle}</Text>
            </View>
            <Text style={styles.sentence}>{sentence}</Text>
        </View>
    );
};

const genderStyle = {
    fontSize: 24,
    height: 50,
    paddingHorizontal: 12,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        height: 100,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        justifyContent: 'center',
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    sentence: {
        fontSize: 12,
        flexDirection: 'row',
        flex: 1,
        marginTop: 18,
        marginBottom: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderF: {
        // ... = spread operator - retrieves everything between the {}
        ...genderStyle,
        color: '#2EA855',
    },
    genderM: {
        ...genderStyle,
        color: '#CC2811',
    },
    genderV: {
        ...genderStyle,
        color: '#235493',
    },
    genderA: {
        ...genderStyle,
        color: '#900C3F',
    },
});

export default WordListItem;
