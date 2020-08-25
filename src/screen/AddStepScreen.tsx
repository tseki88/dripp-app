import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import globalStyle from '../styles/globalStyle';
import {AppText, StepSelector, InputTime} from '../components';
import {NavigationProp, StackActions} from '@react-navigation/native';

type AddStepScreenProps = {
  navigation: NavigationProp<any, any>;
};

const AddStepScreen = ({navigation}: AddStepScreenProps) => {
  const [stepType, setStepType] = useState<number>(0);

  const [noteCount, setNoteCount] = useState<number>(0);

  const addStepHandler = () => {
    // get entered data and return to previous screen (recipe overview)
    navigation.dispatch(StackActions.pop());
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="height"
      keyboardVerticalOffset={100}>
      <Pressable
        style={[globalStyle.wrapper, {justifyContent: 'space-between'}]}
        onPress={() => Keyboard.dismiss()}>
        <View>
          <AppText style={globalStyle.fontHeaderTwo}>Step:</AppText>
          <StepSelector stepType={stepType} setStepType={setStepType} />
        </View>
        <View
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <AppText style={globalStyle.fontHeaderTwo}>Duration:</AppText>
          </View>
          <InputTime />
        </View>
        <View
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <AppText style={globalStyle.fontHeaderTwo}>Target Weight:</AppText>
            <AppText>
              Optional will be what the scale should display by end of step.
            </AppText>
          </View>
          <View
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={[globalStyle.fontBase, {borderWidth: 1}]}
              keyboardType="number-pad"
              caretHidden={true}
            />
            <AppText>g</AppText>
          </View>
        </View>
        <View>
          <AppText style={globalStyle.fontHeaderTwo}>Notes: </AppText>
          <View style={styles.noteContainer}>
            <TextInput
              style={globalStyle.fontBase}
              placeholder="Optional"
              multiline={true}
              numberOfLines={3}
              maxLength={200}
              onChangeText={(e) => setNoteCount(e.length)}
            />
            <View style={styles.noteWordCount}>
              <AppText>{noteCount} / 200</AppText>
            </View>
          </View>
        </View>
        <Pressable
          style={{borderWidth: 1, height: 50}}
          onPress={() => addStepHandler()}>
          <AppText>Add Step</AppText>
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default AddStepScreen;

const styles = StyleSheet.create({
  noteContainer: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 25,
  },
  noteWordCount: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
});
