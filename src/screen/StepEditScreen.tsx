import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from 'react-native';
import globalStyle from '../styles/globalStyle';
import {
  AppText,
  StepTypeSelector,
  Card,
  Button,
  TimeSelector,
  TimeDisplay,
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
  const [waterAmount, setWaterAmount] = useState<string>('0');
  const [note, setNote] = useState<string>('');
  const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);

  const [noteCount, setNoteCount] = useState<number>(0);

  const [waterFocused, setWaterFocused] = useState<boolean>(false);

  useEffect((): void => {
    if (route.params) {
      setStepType(route.params.stepType);
      setDuration(route.params.duration);
      if (route.params.waterAmount !== 0) {
        setWaterAmount(route.params.waterAmount.toFixed(1));
      }
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

    // remove any empty rows
    let finalNoteValue: string = note;
    if (note.includes('\n')) {
      const notevalidation = note.split('\n').filter((e) => {
        return e.trim() !== '';
      });
      finalNoteValue = notevalidation.join('\n');
    }

    navigation.navigate('RecipeEdit', {
      newStep: {
        id: timeStampId,
        stepType: stepType,
        duration: duration,
        notes: finalNoteValue,
        waterAmount: parseFloat(waterAmount),
      },
    });
  };

  const noteChangeHandler = (e: string): void => {
    setNote(e);
    setNoteCount(e.length);
  };

  const waterInputChangeHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    // TODO: Turn this into a utility function, as MetricEdit also uses this.
    e.preventDefault();
    const value = e.nativeEvent.text;
    const finalValidation = /(^(0|[1-9][0-9]*)?\.+?\d?)|(^(0|[1-9][0-9]*))/gim;
    let nullProof = value;
    let checkLeading: RegExpMatchArray | null;

    if (value[1] !== '.' && value[1] !== undefined && value[0] === '0') {
      nullProof = value[1];
    } else if (value === undefined || value === '') {
      nullProof = '0';
    }

    checkLeading = nullProof.match(finalValidation);

    if (checkLeading === null || checkLeading === undefined) {
      checkLeading = [''];
    }

    setWaterAmount(checkLeading.toString());
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
          <Card label="Duration:" onPress={() => setTimeModalVisible(true)}>
            <TimeSelector
              timeModalVisible={timeModalVisible}
              setTimeModalVisible={setTimeModalVisible}
              duration={duration}
              setDuration={setDuration}
            />
            <TimeDisplay time={duration} />
            {/* <InputTime duration={duration} setDuration={setDuration} /> */}
          </Card>
          <Card label="Water Amount:">
            <View style={styles.inputContainer}>
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: waterFocused ? 'blue' : 'transparent',
                }}>
                <View style={{flex: 1, position: 'relative'}}>
                  <TextInput
                    style={[globalStyle.fontInput, styles.waterInput]}
                    value={waterAmount}
                    onChange={(e) => waterInputChangeHandler(e)}
                    keyboardType="numeric"
                    onFocus={() => setWaterFocused(true)}
                    onBlur={() => setWaterFocused(false)}
                  />
                </View>
              </View>
              <AppText style={globalStyle.fontInput}> g</AppText>
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
        <Button
          text={route.params ? 'Edit Step' : 'Add Step'}
          pressHandler={addStepHandler}
        />
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
  waterInput: {
    padding: 0,
    textAlign: 'center',
  },
});
