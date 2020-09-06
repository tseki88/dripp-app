import React, {ReactNode} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import globalStyle from '../styles/globalStyle';
import AppText from './AppText';

interface CardProps {
  children: ReactNode;
  label?: string | null;
  style?: object | null;
  onPress?: Function | undefined;
}

const Card = ({
  children,
  style = null,
  label = null,
  onPress = undefined,
}: CardProps) => {
  return (
    <Pressable
      onPress={onPress ? () => onPress() : undefined}
      disabled={onPress ? false : true}
      style={[styles.cardContainer, style]}>
      {label ? (
        <AppText style={[globalStyle.fontLabelSmall]}>{label}</AppText>
      ) : null}
      {children}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    // backgroundColor: '#fcf3ec',
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
});
