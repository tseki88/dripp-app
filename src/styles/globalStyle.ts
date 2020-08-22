import {StyleSheet, Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 380;

export function actuatedNormalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

const globalStyle = StyleSheet.create({
  wrapper: {
    marginHorizontal: 5,
    flex: 1,
  },
  fontBase: {
    fontSize: actuatedNormalize(16),
  },
});

export default globalStyle;
