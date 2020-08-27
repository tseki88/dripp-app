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
import {AppText, StepTypeSelector, InputTime, Card, Button} from '../components';
import {NavigationProp, StackActions, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../utils/typeInterface';

type StepEditRouteProps = RouteProp<MainStackParamList, 'StepEdit'>;

type StepEditScreenProps = {
  navigation: NavigationProp<any, any>;
  route: StepEditRouteProps;
};

const StepEditScreen = ({navigation, route}: StepEditScreenProps) => {
  const [stepType, setStepType] = useState<number>(0);

  const [noteCount, setNoteCount] = useState<number>(0);

  // 2 different handlers, based on if this is a NEW step or Editing EXISTING step
  const addStepHandler = () => {
    // get entered data and return to previous screen (recipe overview)
    const timeStampId:number = Date.now()

    navigation.navigate('Recipe', {newStep:{
          id: timeStampId,
          stepType: stepType,
          duration: 3000,
          notes: "this step was added from prev. screen"
        } })
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="height"
      keyboardVerticalOffset={100}>
      <Pressable
        style={[globalStyle.wrapper, {justifyContent: 'space-between'}]}
        onPress={() => Keyboard.dismiss()}>
        <Card label="Step:">
          {/* <AppText style={globalStyle.fontHeaderTwo}>Step:</AppText> */}
          <StepTypeSelector stepType={stepType} setStepType={setStepType} />
        </Card>
        <View
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Card label="Duration:" style={{height: '100%'}}>
            <InputTime />
          </Card>
          <Card label="Target Weight:" style={{height: '100%'}}>
            {/* <AppText>
              Optional will be what the scale should display by end of step.
            </AppText> */}
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
          </Card>
        </View>
        <Card label="Notes:" style={{flex: 2}}>
          {/* <AppText style={globalStyle.fontHeaderTwo}>Notes: </AppText> */}
          <View style={styles.noteContainer}>
            <TextInput
              style={globalStyle.fontBase}
              placeholder="Optional"
              multiline={true}
              numberOfLines={5}
              maxLength={200}
              onChangeText={(e) => setNoteCount(e.length)}
            />
            <View style={styles.noteWordCount}>
              <AppText>{noteCount} / 200</AppText>
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
    // borderWidth: 1,
    // borderRadius: 25,
  },
  noteWordCount: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  }
});
