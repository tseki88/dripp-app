import React from 'react';
import {Text, TextProps} from 'react-native';
import globalStyle from '../styles/globalStyle';

type AppTextProps = {
  children: TextProps;
  style?: object | null;
};

const AppText = ({children, style = null}: AppTextProps) => {
  return (
    <>
      <Text style={[globalStyle.fontBase, style]}>{children}</Text>
    </>
  );
};

export default AppText;
