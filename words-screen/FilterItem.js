import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FilterBubble from './FilterBubble';
import {filters, getItalianFilterTypes} from '../repository/LanguageRepository';

const FilterItem = ({isVisible, selectedKeywords, updateSearch}) => {
    const [filtersData, setFiltersData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const setResult = (dataItems) => {
        setFiltersData(dataItems);
        setError(dataItems.error);
        setIsLoading(false);
    };

    const getFiltersData = async (): void => {
        try {
            setIsLoading(true);
            setResult(await getItalianFilterTypes());
        } catch (e) {
            setIsLoading(false);
            setError(e);
        }
    };

    const onSelect = (keyword, selectedKeyWords) => {
        if (selectedKeyWords.includes(keyword)) {
            selectedKeyWords = selectedKeyWords.filter(key => key !== keyword);
        } else {
            selectedKeyWords.push(keyword);
        }
        if (!selectedKeyWords.length) {
            selectedKeyWords.push(filters.NONE);
        }
        updateSearch('', selectedKeyWords);
    };

    /**
     equivalent with componentDidMount AND componentDidUpdate;
     if you want only to reference componentDidMount, set deps to empty array of dependencies
     if you want to reference componentDidUpdate, you should specify inside deps what it is you want to update
     */
    useEffect(() => {
        getFiltersData();
    }, []);

    return isVisible ? (
        <FlatList
            style={styles.container}
            keyExtractor={item => item.keyword}
            data={filtersData || {}}
            renderItem={({item}) => (
                <FilterBubble
                    text={item.keyword}
                    onSelect={() =>
                        onSelect(item.keyword, selectedKeywords)
                    }
                />
            )}
        />
    ) : (
        <View/>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginLeft: 8,
        marginRight: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#FFF',
        elevation: 2,
    },
});

export default FilterItem;
