import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Modal, Pressable, FlatList} from 'react-native';
import AppText from './AppText';
import globalStyle from '../styles/globalStyle';

type TempSelectorProps = {
  tempModalVisible: boolean;
  setTempModalVisible: Function;
  waterTempValue: number;
  setWaterTempValue: Function;
};

const TempSelector = ({
  tempModalVisible,
  setTempModalVisible,
  waterTempValue,
  setWaterTempValue,
}: TempSelectorProps) => {
  const [indexValue, setIndexValue] = useState<number>(waterTempValue);
  const [tempCelsius, setTempCelsius] = useState<boolean>(true);

  const scrollViewRef = useRef(null);

  const updateValueHandler = () => {
    setWaterTempValue(indexValue);
    setTempModalVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current !== null) {
        // @ts-expect-error -not null, inside null check
        scrollViewRef.current.scrollToIndex({
          index: waterTempValue,
          animated: false,
        });
      }
    }, 10);
  }, [waterTempValue]);

  // TODO: Celcius => F converting triggers recalculation of array range. What should the data be stored as?

  // TODO: create arrays with values of the actual temperature values
  const celsiusRange = Array.from({length: 101});
  const fahrenheitRange = Array.from({length: 181});

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={tempModalVisible}
      onRequestClose={() => setTempModalVisible(false)}
      onDismiss={() => setTempModalVisible(false)}
      presentationStyle="overFullScreen">
      <View style={styles.relative}>
        <Pressable
          onPress={() => setTempModalVisible(false)}
          style={styles.absolute}
        />
        <View style={styles.innerContainer}>
          <View style={styles.scrollContainer}>
            <FlatList
              data={fahrenheitRange}
              keyExtractor={(item, index) => index.toString()}
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              decelerationRate="fast"
              contentContainerStyle={styles.scrollContentContainer}
              fadingEdgeLength={120}
              getItemLayout={(data, index) => ({
                length: 60,
                offset: 60 * index,
                index,
              })}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.listItem}>
                    <AppText style={globalStyle.fontHeaderTwo}>
                      {(index + 32).toString()}
                    </AppText>
                  </View>
                );
              }}
              snapToOffsets={fahrenheitRange.map((e, i) => {
                return i * 60;
              })}
              onMomentumScrollEnd={(e) =>
                setIndexValue(Math.round(e.nativeEvent.contentOffset.y / 60))
              }
            />
            <View style={{height: '100%', width: '30%', alignItems: 'center', marginLeft: 10, borderWidth: 2, borderRadius: 10, overflow: 'hidden'}}>
              <Pressable onPress={() => setTempCelsius(true)} style={{borderBottomWidth: 1, flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: (tempCelsius ? 'darkgrey' : null)}}>
                <AppText style={globalStyle.fontHeaderTwo}>C</AppText>
              </Pressable>
              <Pressable onPress={() => setTempCelsius(false)} style={{borderTopWidth: 1, flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: (tempCelsius ? null : 'darkgrey')}}>
                <AppText style={globalStyle.fontHeaderTwo}>F</AppText>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={styles.confirmButton}
            hitSlop={4}
            onPress={() => updateValueHandler()}>
            <AppText style={globalStyle.fontBold}>OK</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default TempSelector;

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'grey',
    opacity: 0.6,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '80%',
    backgroundColor: 'white',
    zIndex: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  scrollContainer: {
    height: 120,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  listItem: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignSelf: 'flex-end',
  },
});
