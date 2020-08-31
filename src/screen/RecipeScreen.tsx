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
import grindParse from '../utils/grindParse';

type RecipeRouteProps = RouteProp<MainStackParamList, 'Recipe'>;

interface RecipeScreenProps {
  navigation: NavigationProp<any, any>;
  route: RecipeRouteProps;
}

const RecipeScreen = ({navigation, route}: RecipeScreenProps) => {
  const [editMode, setEditMode] = useState(false);

  const [brewTypeValue, setBrewTypeValue] = useState<number>(0);
  const [nameValue, setNameValue] = useState<string>('');
  const [metricObject, setMetricObject] = useState<BrewMetricInterface>({
    coffeeGrind: 0,
    coffeeWeight: 0,
    waterWeight: 0,
    waterTemp: 0,
    ratio: 17.0,
  });
  // prevents page from jumping on load, when creating a new recipe an empty array is passed in
  const [stepsArray, setStepsArray] = useState<StepInterface[]>(
    route.params.steps,
  );

  useEffect(() => {
    if (route.params.id) {
      const {brewType, name, metric, steps} = route.params;

      setBrewTypeValue(brewType);
      setNameValue(name);
      setMetricObject(metric);
      setStepsArray(steps);
    }
  }, [route.params]);

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
            {/* <AppText>{brewTypeValue}</AppText> */}
            <AppText style={globalStyle.fontHeaderTwo}>{nameValue}</AppText>
          </View>
          <Pressable
            style={{
              alignItems: 'center',
              width: 60,
              paddingVertical: 2,
              borderWidth: 1,
              borderRadius: 30,
              position: 'absolute',
              right: 8,
            }}
            onPress={() => setEditMode((prev) => !prev)}>
            <AppText>{editMode ? 'Lock' : 'Edit'}</AppText>
          </Pressable>
        </View>
        {editMode ? (
          <MetricEdit
            metricObject={metricObject}
            setMetricObject={setMetricObject}
          />
        ) : (
          <View style={styles.metricsContainer}>
            <View style={styles.spaceBetween}>
              <Card label="Grind:">
                <AppText>{grindParse(metricObject.coffeeGrind)}</AppText>
              </Card>
              <Card label="Water Temp:" style={{alignItems: 'flex-end'}}>
                <AppText>{metricObject.waterTemp} C</AppText>
              </Card>
            </View>
            <View style={styles.spaceBetween}>
              <Card label="Coffee:">
                <AppText
                  style={[globalStyle.fontHeaderTwo, {textAlign: 'center'}]}>
                  {metricObject.coffeeWeight.toFixed(1)} g
                </AppText>
              </Card>
              <Card label="Water:">
                <AppText
                  style={[globalStyle.fontHeaderTwo, {textAlign: 'center'}]}>
                  {metricObject.waterWeight.toFixed(1)} g
                </AppText>
              </Card>
            </View>
            <Card label="Ratio:" style={{alignItems: 'center'}}>
              <AppText>1 : {metricObject.ratio.toFixed(1)}</AppText>
            </Card>
          </View>
        )}
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
              onPress={
                editMode ? () => navigation.navigate('StepEdit', item) : null
              }
              style={{backgroundColor: editMode ? '#fcf3ec' : undefined}}>
              <StepList step={item} index={index} />
            </Pressable>
          );
        })}
        {editMode ? (
          <Button
            text="Add Step"
            pressHandler={() => navigation.navigate('StepEdit')}
          />
        ) : null}
      </Card>
      <Button
        text="Get Brewin"
        // need to collect 'most updated' steps list (in case they edited)
        pressHandler={() =>
          navigation.navigate('Timer', {
            brewType: brewTypeValue,
            name: nameValue,
            metric: metricObject,
            steps: stepsArray,
          })
        }
      />
    </ScrollView>
  );
};

export default RecipeScreen;

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
