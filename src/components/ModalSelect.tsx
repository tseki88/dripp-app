import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Modal, ScrollView, Pressable} from 'react-native';
import grindParse from '../utils/grindParse';
import AppText from './AppText';
import globalStyle from '../styles/globalStyle';

type ModalSelectProps = {
  modalVisible: boolean;
  setModalVisible: Function;
  coffeeGrindValue: number;
  setCoffeeGrindValue: Function;
};

const ModalSelect = ({
  modalVisible,
  setModalVisible,
  coffeeGrindValue,
  setCoffeeGrindValue,
}: ModalSelectProps) => {
  const [indexValue, setIndexValue] = useState<number>(coffeeGrindValue);

  const scrollViewRef = useRef(null);

  const updateValueHandler = () => {
    setCoffeeGrindValue(indexValue);
    setModalVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current !== null) {
        // @ts-expect-error -inside null check
        scrollViewRef.current.scrollTo({
          y: coffeeGrindValue * 60,
          animated: false,
        });
      }
    }, 10);
  }, [coffeeGrindValue]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      onDismiss={() => setModalVisible(false)}
      presentationStyle="overFullScreen">
      <View style={styles.relative}>
        <View
          style={[styles.absolute, {backgroundColor: 'grey', opacity: 0.6}]}
        />
        <View style={styles.innerContainer}>
          <View style={styles.scrollContainer}>
            <ScrollView
              contentContainerStyle={[
                {flexGrow: 1, justifyContent: 'center', paddingVertical: 30},
              ]}
              snapToOffsets={[0, 1, 2, 3, 4, 5, 6].map((e) => {
                return e * 60;
              })}
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) =>
                setIndexValue(e.nativeEvent.contentOffset.y / 60)
              }
              fadingEdgeLength={120}>
              {[0, 1, 2, 3, 4, 5, 6].map((e, i) => {
                return (
                  <View style={styles.listItem}>
                    <AppText style={globalStyle.fontHeaderTwo}>
                      {grindParse(i)}
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

export default ModalSelect;

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
  },
  innerContainer: {
    paddingHorizontal: 20,
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
  },
  listItem: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignSelf: 'flex-end',
  },
});
