import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

interface ButtonProp {
  pressHandler: Function;
  text: string;
}

const Button = ({pressHandler, text}: ButtonProp) => {
  return (
    <Pressable style={styles.container} onPress={() => pressHandler()}>
      <Text>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
});
