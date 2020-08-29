import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyle from '../styles/globalStyle';
import AppText from './AppText';

interface CardProps {
  children: ReactNode;
  label?: string | null;
  style?: object | null;
}

const Card = ({children, style = null, label = null}: CardProps) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {label ? (
        <AppText style={[globalStyle.fontLabelSmall]}>{label}</AppText>
      ) : null}
      {children}
    </View>
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
