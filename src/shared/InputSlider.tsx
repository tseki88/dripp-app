import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';

const InputSlider = () => {
  const [sliderValue, setSliderValue] = useState<string>('');

  const changeHanlder = (value: number) => {
    const coffee = [
      'extra coarse',
      'coarse',
      'medium coarse',
      'medium',
      'medium fine',
      'fine',
      'extra fine',
    ];

    setSliderValue(coffee[value]);
  };

  return (
    <View>
      <Text>{sliderValue}</Text>
      <Slider
        style={{width: 300, height: 20}}
        minimumValue={0}
        maximumValue={6}
        step={1}
        onValueChange={(e) => changeHanlder(e)}
      />
    </View>
  );
};

export default InputSlider;

const styles = StyleSheet.create({});
