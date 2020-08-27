import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import AppText from './AppText';

interface StepTypeSelectorProps {
  stepType: number;
  setStepType: Function;
}

const StepTypeSelector = ({stepType, setStepType}: StepTypeSelectorProps) => {
  const [displaySelection, setDisplaySelection] = useState<boolean>(false);

  const selection = [0, 1, 2, 3, 4];

  const pressHandler = (e: number) => {
    setStepType(e);
    setDisplaySelection(false);
  };

  return (
    <>
      {!displaySelection ? (
        <Pressable onPress={() => setDisplaySelection(true)}>
          <AppText>{stepType}</AppText>
        </Pressable>
      ) : (
        <View style={styles.selectionContainer}>
          {selection.map((e, i) => {
            return (
              <Pressable
                key={i}
                style={styles.selection}
                onPress={() => pressHandler(e)}>
                <AppText style={{textAlign: 'center'}}>{e}</AppText>
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
    borderStyle: 'dotted',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selection: {
    flexBasis: '30%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});
