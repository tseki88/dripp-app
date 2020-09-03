import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import AppText from './AppText';
import stepParse from '../utils/stepParse';

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
      {!displaySelection ? (
        <Pressable
          style={styles.selected}
          onPress={() => setDisplaySelection(true)}>
          <AppText style={{textAlign: 'center'}}>{stepParse(stepType)}</AppText>
        </Pressable>
      ) : (
        <View style={styles.selectionContainer}>
          {selection.map((e, i) => {
            return (
              <Pressable
                key={i}
                style={[styles.selection, stepType === e && styles.selected]}
                onPress={() => pressHandler(e)}>
                <AppText style={{textAlign: 'center'}}>{stepParse(e)}</AppText>
              </Pressable>
            );
          })}
        </View>
      )}
    </>
  );
};

export default StepTypeSelector;

const styles = StyleSheet.create({
  selectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#fcf3ec',
  },
  selected: {
    paddingVertical: 10,
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    backgroundColor: '#fcf3ec',
  },
  selection: {
    flexBasis: '30%',
    paddingVertical: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
