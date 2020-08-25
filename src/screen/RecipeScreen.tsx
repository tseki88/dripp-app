import React from 'react';
import {StyleSheet, View, FlatList, Pressable, ScrollView} from 'react-native';
import {StepList, AppText, TimeDisplay, Card} from '../components';
import globalStyle from '../styles/globalStyle';
import {MainStackParamList} from '../utils/typeInterface';
import {NavigationProp, RouteProp} from '@react-navigation/native';

type RecipeRouteProps = RouteProp<MainStackParamList, 'Recipe'>;

interface RecipeScreenProps {
  navigation: NavigationProp<any, any>;
  route: RecipeRouteProps;
}

const RecipeScreen = ({navigation, route}: RecipeScreenProps) => {
  const {brewType, name, metric, steps} = route.params;

  const totalTime = steps.reduce((a: number, b: any) => {
    return a + b.duration;
  }, 0);

  return (
    <ScrollView style={globalStyle.wrapper}>
      <View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <AppText>{brewType}</AppText>
          <AppText>{name}</AppText>
        </View>
        <View style={styles.metricsContainer}>
          <View style={styles.spaceBetween}>
            <Card label="Grind:">
              <AppText>{metric.coffeeGrind}</AppText>
            </Card>
            <Card label="Water Temp:" style={{alignItems: 'flex-end'}}>
              <AppText>{metric.waterTemp} C</AppText>
            </Card>
          </View>
          <View style={styles.spaceBetween}>
            <Card label="Coffee:" style={{alignItems: 'center'}}>
              <AppText style={globalStyle.fontHeaderTwo}>
                {metric.coffeeWeight} g
              </AppText>
            </Card>
            <Card label="Water:" style={{alignItems: 'center'}}>
              <AppText style={globalStyle.fontHeaderTwo}>
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
          data={steps}
          renderItem={({item, index}) => {
            return <StepList step={item} index={index} />;
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
      <Pressable
        onPress={() => navigation.navigate('Timer', route.params)}
        style={{padding: 10, borderWidth: 1, marginBottom: 10}}>
        <AppText>Get Brewin</AppText>
      </Pressable>
    </ScrollView>
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
    flex: 2,
  },
});
