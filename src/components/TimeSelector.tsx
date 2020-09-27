import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Modal, ScrollView, Pressable} from 'react-native';
import globalStyle from '../styles/globalStyle';
import AppText from './AppText';

type TimeSelectorProps = {
  timeModalVisible: boolean;
  setTimeModalVisible: Function;
  duration: number;
  setDuration: Function;
};

const TimeSelector = ({
  timeModalVisible,
  setTimeModalVisible,
  duration,
  setDuration,
}: TimeSelectorProps) => {
  // 2 is the indexPosition of 0;
  const [secondsIndexState, setSecondsIndexState] = useState<number>(2);
  const [minutesIndexState, setMinutesIndexState] = useState<number>(2);
  // const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);

  const secondRef = useRef(null);
  const minuteRef = useRef(null);

  const updateValueHandler = () => {
    const timeValue: number =
      scrollIndexConvert(secondsIndexState) * 1000 +
      scrollIndexConvert(minutesIndexState) * 60000;
    setDuration(timeValue);
    setTimeModalVisible(false);
  };

  useEffect(() => {
    if (timeModalVisible) {
      // TO DO:
      // Existing Duration Flow:
      // - On load useEffect to update indexValues (do math for ms -> sec/min)
      // - run scrollTo that indexValue
      // If new index , both index = 2...?
      const seconds = Math.ceil(duration / 1000) % 60 + 2;
      const minutes = Math.floor(duration / 60000) % 60 + 2;

      setSecondsIndexState(seconds);
      setMinutesIndexState(minutes);

      setTimeout(() => {
        if (secondRef.current !== null) {
          // @ts-expect-error -not null, inside null check
          secondRef.current.scrollTo({
            y: seconds * 60,
            animated: false,
          });
        }
        if (minuteRef.current !== null) {
          // @ts-expect-error -not null, inside null check
          minuteRef.current.scrollTo({
            y: minutes * 60,
            animated: false,
          });
        }
      }, 10);
    }
  }, [timeModalVisible]);

  const scrollIndexConvert = (indexValue: number): number => {
    let finalValue: number;

    switch (indexValue) {
      case 0:
        finalValue = 58;
        break;
      case 1:
        finalValue = 59;
        break;
      case 63:
        finalValue = 0;
        break;
      case 64:
        finalValue = 1;
        break;
      default:
        finalValue = indexValue - 2;
        break;
    }
    return finalValue;
  };

  const [timeArrayRef, setTimeArrayRef] = useState<string[]>([]);

  useEffect(() => {
    const timeArray: string[] = [];
    if (timeArray.length === 0) {
      for (let i = -2; i < 62; i++) {
        if (i === -1) {
          timeArray.push('59');
        } else if (i === -2) {
          timeArray.push('58');
        } else if (i === 61) {
          timeArray.push('01');
        } else if (i === 60) {
          timeArray.push('02');
        } else {
          timeArray.push(('0' + i).slice(-2));
        }
      }
    }

    setTimeArrayRef(timeArray);
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={timeModalVisible}
      onRequestClose={() => setTimeModalVisible(false)}
      onDismiss={() => setTimeModalVisible(false)}
      presentationStyle="overFullScreen">
      <View style={styles.relative}>
        <Pressable
          onPress={() => setTimeModalVisible(false)}
          style={styles.absolute}
        />
        <View style={styles.innerContainer}>
          <View style={styles.scrollContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContentContainer}
              snapToOffsets={timeArrayRef.map((e, i) => {
                return i * 60;
              })}
              ref={minuteRef}
              showsVerticalScrollIndicator={false}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) =>
                setMinutesIndexState(
                  Math.round(e.nativeEvent.contentOffset.y / 60),
                )
              }
              onScroll={({nativeEvent}) => {
                if (nativeEvent.contentOffset.y >= 61.5 * 60) {
                  minuteRef.current.scrollTo({y: 2 * 60, animated: false});
                } else if (nativeEvent.contentOffset.y <= 0.5 * 60) {
                  minuteRef.current.scrollTo({y: 60 * 60, animated: false});
                }
              }}
              fadingEdgeLength={120}>
              {/* TODO: Refactor into FlatList for improved performance */}
              {timeArrayRef.map((e, i) => {
                return (
                  <View key={i} style={styles.listItem}>
                    <AppText style={globalStyle.fontHeaderTwo}>
                      {e.toString()}
                    </AppText>
                  </View>
                );
              })}
            </ScrollView>
            {/* </View>
          <View style={styles.scrollContainer}> */}
            <ScrollView
              contentContainerStyle={styles.scrollContentContainer}
              snapToOffsets={timeArrayRef.map((e, i) => {
                return i * 60;
              })}
              ref={secondRef}
              showsVerticalScrollIndicator={false}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) =>
                setSecondsIndexState(
                  Math.round(e.nativeEvent.contentOffset.y / 60),
                )
              }
              onScroll={({nativeEvent}) => {
                if (nativeEvent.contentOffset.y >= 61.5 * 60) {
                  secondRef.current.scrollTo({y: 2 * 60, animated: false});
                } else if (nativeEvent.contentOffset.y <= 0.5 * 60) {
                  secondRef.current.scrollTo({y: 60 * 60, animated: false});
                }
              }}
              fadingEdgeLength={120}>
              {timeArrayRef.map((e, i) => {
                return (
                  <View key={i} style={styles.listItem}>
                    <AppText style={globalStyle.fontHeaderTwo}>
                      {e.toString()}
                    </AppText>
                  </View>
                );
              })}
            </ScrollView>
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

export default TimeSelector;

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
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  scrollContainer: {
    flexDirection: 'row',
    height: 120,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  listItem: {
    paddingHorizontal: 20,
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
