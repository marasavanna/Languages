import React, {Component, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const FilterBubble = ({text, onSelect}) => {

  const [isSelected, setIsSelected] = useState(false);
  const opacityValue = isSelected ? 1 : 0.5;

  return (
      <TouchableOpacity
          style={[styles.container]}
          color={'#414442'}
          onPress={() => {
            setIsSelected(!isSelected);
            onSelect();
          }}>
        <View style={{opacity: opacityValue}}>
          <Text style={styles.textStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  container: {
    padding: 11,
    alignSelf: 'baseline',
    marginTop: 6,
    marginLeft: 6,
    color: '#414442',
    backgroundColor: '#414442',
    borderRadius: 5,
    elevation: 2,
  },
  textStyle: {
    color: '#FFF',
  },
});

export default FilterBubble;
