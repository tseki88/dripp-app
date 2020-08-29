import {StyleSheet, Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 380;

export function actuatedNormalize(size: number): number {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

const globalStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fontBase: {
    fontSize: actuatedNormalize(18),
    fontFamily: 'Nunito-Regular',
  },
  fontSemiBold: {
    fontFamily: 'Nunito-SemiBold',
  },
  fontHeaderOne: {
    fontSize: actuatedNormalize(32),
    fontFamily: 'Lato-Bold',
  },
  fontHeaderTwo: {
    fontSize: actuatedNormalize(22),
    fontFamily: 'Lato-Bold',
  },
  fontLabelSmall: {
    fontSize: actuatedNormalize(14),
    color: '#725034',
  },
  fontSmall: {
    fontSize: actuatedNormalize(15),
  },
});

// #f4693e orange

export default globalStyle;
