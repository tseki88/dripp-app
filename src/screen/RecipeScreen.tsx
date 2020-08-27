import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Pressable, ScrollView} from 'react-native';
import {StepList, AppText, TimeDisplay, Card, Button} from '../components';
import globalStyle from '../styles/globalStyle';
import {MainStackParamList, StepInterface} from '../utils/typeInterface';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import grindParse from '../utils/grindParse';

type RecipeRouteProps = RouteProp<MainStackParamList, 'Recipe'>;

interface RecipeScreenProps {
  navigation: NavigationProp<any, any>;
  route: RecipeRouteProps;
}

const RecipeScreen = ({navigation, route}: RecipeScreenProps) => {
  const [editMode, setEditMode] = useState(false);

  const {brewType, name, metric, steps} = route.params;

  const [stepsArray, setStepsArray] = useState<StepInterface[]>(steps);

  useEffect(() => {
    if (route.params?.newStep) {
      setStepsArray((prev) => [...prev, route.params.newStep]);
    }
  }, [route.params?.newStep]);

  const totalTime = steps.reduce((a: number, b: StepInterface) => {
    return a + b.duration;
  }, 0);

  return (
    <View style={globalStyle.wrapper}>
      <Button
        text={editMode ? 'Lock' : 'Edit'}
        pressHandler={() => setEditMode((prev) => !prev)}
      />
      <View style={{flex: 1}}>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <AppText>{brewType}</AppText>
          <AppText>{name}</AppText>
        </View>
        <View style={styles.metricsContainer}>
          <View style={styles.spaceBetween}>
            <Card label="Grind:">
              <AppText>{grindParse(metric.coffeeGrind)}</AppText>
            </Card>
            <Card label="Water Temp:" style={{alignItems: 'flex-end'}}>
              <AppText>{metric.waterTemp} C</AppText>
            </Card>
          </View>
          <View style={styles.spaceBetween}>
            <Card label="Coffee:">
              <AppText
                style={[globalStyle.fontHeaderTwo, {textAlign: 'center'}]}>
                {metric.coffeeWeight} g
              </AppText>
            </Card>
            <Card label="Water:">
              <AppText
                style={[globalStyle.fontHeaderTwo, {textAlign: 'center'}]}>
                {metric.waterWeight} g
              </AppText>
            </Card>
          </View>
          <Card label="Ratio:" style={{alignItems: 'center'}}>
            <AppText>1 : {metric.ratio}</AppText>
          </Card>
        </View>
      </View>
      <Card style={styles.stepListContainer}>
        <View style={styles.spaceBetween}>
          <AppText style={globalStyle.fontLabelSmall}>Steps:</AppText>
          <TimeDisplay time={totalTime} style={globalStyle.fontHeaderTwo} />
        </View>
        <FlatList
          data={stepsArray}
          renderItem={({item, index}) => {
            return <StepList step={item} index={index} />;
          }}
          keyExtractor={(item) => item.id.toString()}
        />
        {editMode ? (
          <Button
            text="Add Step"
            pressHandler={() =>
              // navigation.navigate('StepEdit', {
              //   onGoBack: (item: StepInterface) =>
              //     setStepsArray((prev) => [...prev, item]),
              // })
              navigation.navigate('StepEdit')
            }
          />
        ) : null}
      </Card>
      <Button
        text="Get Brewin"
        pressHandler={() => navigation.navigate('Timer', route.params)}
      />
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricsContainer: {
    flex: 1,
  },
  stepListContainer: {
    flex: 1,
  },
});
