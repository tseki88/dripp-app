import React, {ReactNode} from 'react';
import {Text} from 'react-native';
import globalStyle from '../styles/globalStyle';

interface AppTextProps {
  children: ReactNode;
  style?: object | null;
}

const AppText = ({children, style = null}: AppTextProps) => {
  return (
    <>
      <Text style={[globalStyle.fontBase, style]}>{children}</Text>
    </>
  );
};

export default AppText;
