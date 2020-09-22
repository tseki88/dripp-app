import React from 'react';
import {StyleSheet, View, ScrollView, Pressable} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StepList, AppText, TimeDisplay, Card, Button} from '../components';
import globalStyle from '../styles/globalStyle';
import {MainStackParamList, StepInterface} from '../utils/typeInterface';
import grindParse from '../utils/grindParse';
import calcTemp from '../utils/calcTemp';

type RecipeRouteProps = RouteProp<MainStackParamList, 'RecipeView'>;

interface RecipeViewScreenProps {
  navigation: NavigationProp<any, any>;
  route: RecipeRouteProps;
}

const RecipeViewScreen = ({navigation, route}: RecipeViewScreenProps) => {
  const {brewType, name, metric, steps} = route.params;

  const totalTime = steps.reduce((a: number, b: StepInterface): number => {
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
            <AppText style={globalStyle.fontHeaderTwo}>{name}</AppText>
          </View>
          <Pressable
            style={{
              position: 'absolute',
              top: 0,
              right: 10,
              padding: 8,
              borderWidth: 2,
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate('RecipeEdit', {...route.params})
            }>
            <AppText>Edit</AppText>
          </Pressable>
        </View>
        <View style={styles.metricsContainer}>
          <View style={styles.spaceBetween}>
            <Card label="Grind:">
              <AppText>{grindParse(metric.coffeeGrind)}</AppText>
            </Card>
            <Card label="Water Temp:" style={{alignItems: 'flex-end'}}>
              <AppText>{calcTemp(metric.waterTemp, false)} F</AppText>
            </Card>
          </View>
          <View style={styles.spaceBetween}>
            <Card label="Coffee:">
              <AppText
                style={[globalStyle.fontHeaderTwo, {textAlign: 'center'}]}>
                {metric.coffeeWeight.toFixed(1)} g
              </AppText>
            </Card>
            <Card label="Water:">
              <AppText
                style={[globalStyle.fontHeaderTwo, {textAlign: 'center'}]}>
                {metric.waterWeight.toFixed(1)} g
              </AppText>
            </Card>
          </View>
          <Card label="Ratio:" style={{alignItems: 'center'}}>
            <AppText>1 : {metric.ratio.toFixed(1)}</AppText>
          </Card>
        </View>
      </View>
      <Card style={styles.stepListContainer}>
        <View style={styles.spaceBetween}>
          <AppText style={globalStyle.fontLabelSmall}>Steps:</AppText>
          <TimeDisplay time={totalTime} style={globalStyle.fontHeaderTwo} />
        </View>
        {steps.map((item, index) => {
          return <StepList key={index} step={item} index={index} />;
        })}
      </Card>
      <Button
        text="Get Brewin"
        pressHandler={() =>
          navigation.navigate('Timer', {
            brewType: brewType,
            name: name,
            metric: metric,
            steps: steps,
          })
        }
      />
    </ScrollView>
  );
};

export default RecipeViewScreen;

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
