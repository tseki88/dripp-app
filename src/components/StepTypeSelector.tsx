import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Modal} from 'react-native';
import AppText from './AppText';
import stepParse from '../utils/stepParse';
import globalStyle from '../styles/globalStyle';

interface StepTypeSelectorProps {
  stepType: number;
  setStepType: Function;
}

const StepTypeSelector = ({stepType, setStepType}: StepTypeSelectorProps) => {
  const [displaySelection, setDisplaySelection] = useState<boolean>(false);

  const selection = [0, 1, 2, 3, 4, 5];

  const pressHandler = (e: number): void => {
    setStepType(e);
    setDisplaySelection(false);
  };

  return (
    <>
      <Pressable
        style={styles.selected}
        onPress={() => setDisplaySelection(true)}>
        <AppText style={{textAlign: 'center'}}>{stepParse(stepType)}</AppText>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={displaySelection}
        onRequestClose={() => setDisplaySelection(false)}
        onDismiss={() => setDisplaySelection(false)}
        presentationStyle="overFullScreen">
        <View style={styles.relative}>
          <Pressable
            onPress={() => setDisplaySelection(false)}
            style={styles.absolute}
          />
          <View style={styles.innerContainer}>
            <AppText style={globalStyle.fontBold}>Select Step Label:</AppText>
            <View style={styles.selectionContainer}>
              {selection.map((e, i) => {
                return (
                  <Pressable
                    key={i}
                    style={[
                      styles.selection,
                      stepType === e && styles.selected,
                    ]}
                    onPress={() => pressHandler(e)}>
                    <AppText style={{textAlign: 'center'}}>
                      {stepParse(e)}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

      {/* )} */}
    </>
  );
};

export default StepTypeSelector;

const styles = StyleSheet.create({
  selected: {
    paddingVertical: 20,
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    backgroundColor: '#fcf3ec',
  },
  selection: {
    flexBasis: '45%',
    paddingVertical: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
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
    width: '80%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    zIndex: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  selectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
});
