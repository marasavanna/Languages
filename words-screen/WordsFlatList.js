import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import {filters, getItalianWords} from '../repository/LanguageRepository';
import WordListItem from './WordListItem';
import FilterItem from './FilterItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class WordsFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            temp: [],
            search: null,
            error: null,
            selectedKeywords: [filters.NONE],
            isSearchClicked: false,
        };
    }

    componentDidMount(): void {
        const {getData} = this;
        getData()
        this.destroyListener = this.props.navigation.addListener('focus', () => {
            getData();
        });
    }

    componentWillUnmount() {
        this.destroyListener();
    }

    renderHeader = () => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() =>
                        this.setState({isSearchClicked: !this.state.isSearchClicked})
                    }>
                    <Input
                        leftIcon={<FontAwesome name="search" size={20} color="white"/>}
                        leftIconContainerStyle={styles.searchIcon}
                        inputStyle={styles.editText}
                        value={this.state.search}
                        placeholderTextColor={'#FFF'}
                        placeholder={'Search word'}
                        underlineColorAndroid={'#FFF'}
                        onChangeText={searchText => {
                            this.updateSearch(searchText, this.state.selectedKeywords);
                            this.setState({search: searchText});
                        }}
                    />
                </TouchableOpacity>
                <FilterItem
                    isVisible={this.state.isSearchClicked}
                    updateSearch={(search, selectedKeyWords) =>
                        this.updateSearch(this.state.search, selectedKeyWords)
                    }
                    selectedKeywords={this.state.selectedKeywords}
                />
            </View>
        );
    };

    updateSearch = (search, selectedKeywords) => {
        this.setState({selectedKeywords});
        const {filterTranslations, filterWords} = this;
        let filteredData = this.state.temp;
        selectedKeywords.forEach(keyword => {
            switch (keyword) {
                case filters.VERB:
                    filteredData = filteredData.filter(item => item.isVerb === true);
                    filterWords(search || '', filteredData);
                    break;
                case filters.IMPURE:
                    filteredData = filteredData.filter(item => item.isImpure === true);
                    filterWords(search || '', filteredData);
                    break;
                case filters.FEMININE:
                    filteredData = filteredData.filter(item => item.type === 'F');
                    filterWords(search || '', filteredData);
                    break;
                case filters.MASCULINE:
                    filteredData = filteredData.filter(item => item.type === 'M');
                    filterWords(search || '', filteredData);
                    break;
                case filters.TRANSLATION:
                    filterTranslations(search || '', filteredData);
                    break;
                case filters.NONE:
                    filterWords(search || '', filteredData);
                    break;
            }
        });
    };

    filterWords = (search, filteredData) => {
        if (!search) {
            this.setState({data: filteredData});
        } else {
            this.setState({
                data: filteredData.filter(it =>
                    it.word.toLowerCase().startsWith(search.toLowerCase()),
                ),
            });
        }
    };

    filterTranslations = (search, filteredData) => {
        if (!search) {
            this.setState({data: filteredData});
        } else {
            this.setState({
                data: this.state.temp.filter(it =>
                    it.meaning.toLowerCase().startsWith(search.toLowerCase()),
                ),
            });
        }
    };

    render = () => {
        return !this.state.temp?.length ? (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            />
        ) : (
            <FlatList
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{paddingBottom: 60}}
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                renderItem={({item}) => (
                    <WordListItem
                        title={item.word.toLowerCase()}
                        subtitle={item.meaning.toLowerCase()}
                        type={item.type}
                        sentence={item.sentence}
                    />
                )}
            />
        );
    };

    getData = async () => {
        try {
            this.setState({loading: true});
            this.setResult(await getItalianWords());
        } catch (e) {
            this.setState({loading: false, error: e});
        }
    };

    setResult = dataItems => {
        this.setState({
            data: dataItems,
            temp: dataItems,
            error: dataItems.error || null,
            loading: false,
        });
    };
}

const styles = StyleSheet.create({
    searchBar: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#414442',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fff',
    },
    editText: {
        color: '#FFF',
    },
    searchIcon: {
        marginLeft: 2,
        marginRight: 15,
    },
});

export default WordsFlatList;
