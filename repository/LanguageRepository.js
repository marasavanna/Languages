import {db} from '../api/firebase';

const italianApi = 'languages/0/';

export const getItalianWords = async () => {
    const query = await db.ref(italianApi + 'words').once('value');
    return Object.values(query.val())
};

export const getItalianFilterTypes = async () => {
    const query = await db.ref(italianApi + 'filters').once('value');
    return [...query.val()].filter(element => element);
};

export const saveWord = async (word) => {
    const id = db.ref(italianApi + 'words').push().key;
    db.ref(italianApi + 'words/' + id).set({...word, id});
};

export const filters = {
    VERB: 'verbs',
    WORD: 'word',
    TRANSLATION: 'translation',
    FEMININE: 'feminine',
    MASCULINE: 'masculine',
    IMPURE: 'impure',
    ADJECTIVES: 'adjectives',
    NONE: 'none',
};
