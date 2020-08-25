import {StyleSheet, Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 380;

export function actuatedNormalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

const globalStyle = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#3d3d3f',
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 1,
  },
  fontBase: {
    fontSize: actuatedNormalize(18),
  },
  fontHeaderOne: {
    fontSize: actuatedNormalize(26),
  },
  fontHeaderTwo: {
    fontSize: actuatedNormalize(22),
  },
  fontLabelSmall: {
    fontSize: actuatedNormalize(14),
  },
  fontSmall: {
    fontSize: actuatedNormalize(15),
  },
});

export default globalStyle;
