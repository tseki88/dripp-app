import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Modal, Pressable, FlatList} from 'react-native';
import AppText from './AppText';
import globalStyle from '../styles/globalStyle';

type TempSelectorProps = {
  tempModalVisible: boolean;
  setTempModalVisible: Function;
  waterTempValue: number;
  setWaterTempValue: Function;
  tempCelsius: boolean;
  setTempCelsius: Function;
  updateMetricObjectHandler: Function;
};

const TempSelector = ({
  tempModalVisible,
  setTempModalVisible,
  waterTempValue,
  setWaterTempValue,
  tempCelsius,
  setTempCelsius,
  updateMetricObjectHandler,
}: TempSelectorProps) => {
  const [indexValue, setIndexValue] = useState<number>(
    tempCelsius ? Math.round((waterTempValue * 5) / 9) : waterTempValue,
  );
  const [tempCelsiusValue, setTempCelsiusValue] = useState<boolean>(
    tempCelsius,
  );

  const celsiusRef = useRef(null);
  const fahrenheitRef = useRef(null);

  const updateValueHandler = () => {
    let tempDataValidation = tempCelsiusValue
      ? Math.round((indexValue * 9) / 5)
      : indexValue;

    setWaterTempValue(() => tempDataValidation);
    setTempCelsius(tempCelsiusValue);
    setTempModalVisible(false);
    updateMetricObjectHandler('waterTemp', tempDataValidation);
  };

  useEffect(() => {
    setTimeout(() => {
      const target = tempCelsiusValue ? celsiusRef : fahrenheitRef;

      if (target.current !== null) {
        // @ts-expect-error -not null, inside null check
        target.current.scrollToIndex({
          index: tempCelsiusValue
            ? Math.round((waterTempValue * 5) / 9)
            : waterTempValue,
          animated: false,
        });
      }
    }, 1);
  }, [waterTempValue, tempModalVisible]);

  // Not setting 

  useEffect(() => {
    setTimeout(() => {
      const target = tempCelsiusValue ? celsiusRef : fahrenheitRef;

      if (target.current !== null) {
        // @ts-expect-error -not null, inside null check
        target.current.scrollToIndex({
          index: indexValue,
          animated: true,
        });
      }
    }, 1);
  }, [tempCelsiusValue, indexValue]);

  // store F value as data (without +32), local storage check on user setting
  const celsiusRange = Array.from({length: 101});
  const fahrenheitRange = Array.from({length: 181});

  const switchTempHandler = (value: boolean): void => {
    if (value !== tempCelsiusValue) {
      if (value) {
        const cValue = Math.round((indexValue * 5) / 9);
        setIndexValue(cValue);
      } else {
        const fValue = Math.round((indexValue * 9) / 5); //no + 32 to take into account for array index
        setIndexValue(fValue);
      }

      setTempCelsiusValue(value);
    }
  };

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
            <View style={{flex: 1}}>
              <FlatList
                style={!tempCelsiusValue && styles.hidedenComponent}
                data={celsiusRange}
                keyExtractor={(item, index) => index.toString()}
                ref={celsiusRef}
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
                        {index.toString()}
                      </AppText>
                    </View>
                  );
                }}
                snapToOffsets={celsiusRange.map((e, i) => {
                  return i * 60;
                })}
                onMomentumScrollEnd={(e) =>
                  setIndexValue(Math.round(e.nativeEvent.contentOffset.y / 60))
                }
              />
              <FlatList
                style={tempCelsiusValue && styles.hidedenComponent}
                data={fahrenheitRange}
                keyExtractor={(item, index) => index.toString()}
                ref={fahrenheitRef}
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
            </View>
            <View style={styles.switchContainer}>
              <Pressable
                onPress={() => switchTempHandler(true)}
                style={[
                  styles.switchTempButton,
                  styles.switchTempButtonTop,
                  tempCelsiusValue && styles.switchTempSelected,
                ]}>
                <AppText style={globalStyle.fontHeaderTwo}>C</AppText>
              </Pressable>
              <Pressable
                onPress={() => switchTempHandler(false)}
                style={[
                  styles.switchTempButton,
                  styles.switchTempButtonBottom,
                  !tempCelsiusValue && styles.switchTempSelected,
                ]}>
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
  hidedenComponent: {
    height: 0,
    opacity: 0,
  },
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
  switchContainer: {
    height: '100%',
    width: '30%',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  switchTempButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchTempButtonTop: {
    borderBottomWidth: 1,
  },
  switchTempButtonBottom: {
    borderTopWidth: 1,
  },
  switchTempSelected: {
    backgroundColor: 'darkgrey',
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignSelf: 'flex-end',
  },
});
