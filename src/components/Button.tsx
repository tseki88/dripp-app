import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import AppText from './AppText';

interface ButtonProp {
  pressHandler: Function;
  text: string;
}

const Button = ({pressHandler, text}: ButtonProp) => {
  return (
    <Pressable style={styles.button} onPress={() => pressHandler()}>
      <AppText style={styles.text}>{text}</AppText>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#725034',
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
