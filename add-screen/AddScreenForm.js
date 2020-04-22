import React, {useRef} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import t from 'tcomb-form-native';
import {saveWord} from '../repository/LanguageRepository';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const Form = t.form.Form;

const Word = t.struct({
    word: t.String,
    meaning: t.String,
    sentence: t.maybe(t.String),
    type: t.enums({M: 'Masculine', F: 'Feminine', V: 'Verb', A: 'Adjective'}, 'type'),
    isImpure: t.Boolean,
});

const options = {
    fields: {
        isVerb: {
            label: 'Is a verb',
        },
        word: {
            error: 'Enter the word you want to translate',
        },
        meaning: {
            error: 'Enter its translation',
        },
    },
};

const AddScreenForm = ({navigation}) => {
    const formReference = useRef();

    const addWord = () => {
        const value = formReference.current.getValue();
        if (value) {
            saveWord(value).then(r => {
                navigation.navigate('Home');
            });
        }
    };

    return <View style={styles.container}>
        <KeyboardAwareScrollView>
        <Form ref={c => formReference.current = c} type={Word} options={options}/>
        <Button title='Add Word' onPress={addWord}/>
        </KeyboardAwareScrollView>
    </View>;
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});
export default AddScreenForm;
