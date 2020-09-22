import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Pressable} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  StepList,
  AppText,
  TimeDisplay,
  Card,
  Button,
  MetricEdit,
} from '../components';
import globalStyle from '../styles/globalStyle';
import {
  MainStackParamList,
  StepInterface,
  BrewMetricInterface,
} from '../utils/typeInterface';

type RecipeRouteProps = RouteProp<MainStackParamList, 'RecipeEdit'>;

interface RecipeViewScreenProps {
  navigation: NavigationProp<any, any>;
  route: RecipeRouteProps;
}

const RecipeEditScreen = ({navigation, route}: RecipeViewScreenProps) => {

  const [brewTypeValue, setBrewTypeValue] = useState<number>(0);
  const [nameValue, setNameValue] = useState<string>('');
  const [metricObject, setMetricObject] = useState<BrewMetricInterface>(route.params.metric);
  // prevents page from jumping on load, when creating a new recipe an empty array is passed in
  const [stepsArray, setStepsArray] = useState<StepInterface[]>(
    route.params.steps,
  );

  useEffect(() => {
    if (route.params?.id) {
      const {brewType, name, metric, steps} = route.params;

      setBrewTypeValue(brewType);
      setNameValue(name);
      setMetricObject(() => metric);
      setStepsArray(steps);
    }
  }, []);

  useEffect(() => {
    if (route.params?.newStep) {
      const {newStep} = route.params;
      let targetIndex: number;

      const updateStepsArray = (modifiedStep: StepInterface): void => {
        return setStepsArray((prev) => {
          prev[targetIndex] = modifiedStep;
          return [...prev];
        });
      };

      let existing: boolean = stepsArray.some((e, i) => {
        if (e.id === newStep.id) {
          targetIndex = i;
          return true;
        }
      });

      // if id already exists, edit that particular one...?
      existing
        ? updateStepsArray(newStep)
        : setStepsArray((prev) => [...prev, newStep]);
    }
  }, [route.params?.newStep]);

  const totalTime = stepsArray.reduce((a: number, b: StepInterface): number => {
    return a + b.duration;
  }, 0);

  const saveHandler = () => {
    navigation.navigate('RecipeView', {
      brewType: brewTypeValue,
      name: nameValue,
      metric: metricObject,
      steps: stepsArray,
    });
  };

  return (
    <ScrollView style={globalStyle.wrapper}>
      <View style={{flex: 1}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            marginVertical: 8,
            position: 'relative',
          }}>
          <View style={{display: 'flex', alignItems: 'center', flex: 1}}>
            <AppText>{brewTypeValue}</AppText>
            <AppText style={globalStyle.fontHeaderTwo}>{nameValue}</AppText>
          </View>
          <View>
            <Pressable onPress={() => saveHandler()} >
              <AppText>Save</AppText>
            </Pressable>
          </View>
        </View>
        <MetricEdit
          metricObject={metricObject}
          setMetricObject={setMetricObject}
        />
      </View>
      <Card style={styles.stepListContainer}>
        <View style={styles.spaceBetween}>
          <AppText style={globalStyle.fontLabelSmall}>Steps:</AppText>
          <TimeDisplay time={totalTime} style={globalStyle.fontHeaderTwo} />
        </View>
        {stepsArray.map((item, index) => {
          return (
            <Pressable
              key={item.id.toString()}
              onPress={() => navigation.navigate('StepEdit', item)}>
              <StepList step={item} index={index} />
            </Pressable>
          );
        })}
        <Button
          text="Add Step"
          pressHandler={() => navigation.navigate('StepEdit')}
        />
      </Card>
    </ScrollView>
  );
};

export default RecipeEditScreen;

const styles = StyleSheet.create({
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  metricsContainer: {
    flex: 1,
  },
  stepListContainer: {
    flex: 1,
    marginTop: 8,
  },
});
