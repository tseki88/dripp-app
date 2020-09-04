import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import globalStyle from '../styles/globalStyle';
import {
  AppText,
  StepTypeSelector,
  InputTime,
  Card,
  Button,
} from '../components';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../utils/typeInterface';

type StepEditRouteProps = RouteProp<MainStackParamList, 'StepEdit'>;

type StepEditScreenProps = {
  navigation: NavigationProp<any, any>;
  route: StepEditRouteProps;
};

const StepEditScreen = ({navigation, route}: StepEditScreenProps) => {
  const [stepType, setStepType] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  const [noteCount, setNoteCount] = useState<number>(0);

  useEffect((): void => {
    if (route.params) {
      setStepType(route.params.stepType);
      setDuration(route.params.duration);
      setWaterAmount(route.params.waterAmount);
      setNote(route.params.notes);
      setNoteCount(route.params.notes.length);
    }
  }, [route.params]);

  // TODO: If time is 0, alert user and abort
  const addStepHandler = (): void => {
    let timeStampId: number = Date.now();

    if (route.params) {
      timeStampId = route.params.id;
    }
    // get entered data and return to previous screen (recipe overview)

    navigation.navigate('Recipe', {
      newStep: {
        id: timeStampId,
        stepType: stepType,
        duration: duration,
        notes: note,
        waterAmount: waterAmount,
      },
    });
  };

  const noteChangeHandler = (e: string): void => {
    setNote(e);
    setNoteCount(e.length);
  };

  const waterInputHandler = (e: string): void => {
    const intConvert = parseFloat(e);
    setWaterAmount(intConvert);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <Pressable
        style={[globalStyle.wrapper]}
        onPress={() => Keyboard.dismiss()}>
        <Card label="Step:" style={{flex: 0}}>
          <StepTypeSelector stepType={stepType} setStepType={setStepType} />
          {/* stretch goal: if Custom Step, provide label input field */}
        </Card>
        <View style={styles.flexRow}>
          <Card label="Duration:">
            <InputTime duration={duration} setDuration={setDuration} />
          </Card>
          <Card label="Water Amount:">
            <View style={styles.inputContainer}>
              <TextInput
                style={[globalStyle.fontBase, {borderWidth: 1}]}
                value={waterAmount.toString()}
                onChangeText={(e) => waterInputHandler(e)}
                keyboardType="number-pad"
                caretHidden={true}
              />
              <AppText>g</AppText>
            </View>
          </Card>
        </View>
        <Card label="Notes:">
          <View style={styles.noteContainer}>
            <TextInput
              style={[globalStyle.fontBase, styles.textArea]}
              placeholder="Optional"
              value={note}
              multiline={true}
              numberOfLines={4}
              maxLength={200}
              onChangeText={(e) => noteChangeHandler(e)}
            />
            <View style={styles.noteWordCount}>
              <AppText style={globalStyle.fontSmall}>
                <AppText
                  style={[
                    globalStyle.fontSmall,
                    noteCount === 200 ? {color: '#f4693e'} : null,
                  ]}>
                  {noteCount}{' '}
                </AppText>
                / 200
              </AppText>
            </View>
          </View>
        </Card>
        <Button text="Add Step" pressHandler={addStepHandler} />
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default StepEditScreen;

const styles = StyleSheet.create({
  noteContainer: {
    position: 'relative',
    flex: 1,
    // borderWidth: 1,
    // borderRadius: 25,
  },
  noteWordCount: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  textArea: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
});
