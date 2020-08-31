import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Card from './Card';
import AppText from './AppText';
import grindParse from '../utils/grindParse';
import globalStyle from '../styles/globalStyle';
import {BrewMetricInterface} from '../utils/typeInterface';
import Slider from '@react-native-community/slider';

type MetricEditProps = {
  metricObject: BrewMetricInterface;
  setMetricObject: Function;
};

const MetricEdit = ({metricObject, setMetricObject}: MetricEditProps) => {
  const {
    coffeeWeight,
    waterWeight,
    ratio,
    coffeeGrind,
    waterTemp,
  } = metricObject;

  const [ratioValue, setRatioValue] = useState<number>(ratio);
  // eslint-disable-next-line prettier/prettier
  const [coffeeWeightValue, setCoffeeWeightValue] = useState<string>(coffeeWeight.toFixed(1));
  // eslint-disable-next-line prettier/prettier
  const [waterWeightValue, setWaterWeightValue] = useState<string>(waterWeight.toFixed(1));
  // const [waterInput, setWaterInput] = useState<string>(waterWeight.toFixed(1));
  const [ratioBaseCoffee, setRatioBaseCoffee] = useState<boolean>(true);

  useEffect(() => {
    if (ratioBaseCoffee) {
      const waterCalc: number =
        Math.round(parseFloat(coffeeWeightValue) * ratioValue * 10) / 10;
      setWaterWeightValue(() => waterCalc.toFixed(1));
    } else if (!ratioBaseCoffee) {
      const coffeeCalc: number =
        Math.round((parseFloat(waterWeightValue) / ratioValue) * 10) / 10;
      setCoffeeWeightValue(() => coffeeCalc.toFixed(1));
    }
  }, [waterWeightValue, coffeeWeightValue, ratioValue, ratioBaseCoffee]);

  const sliderHandler = (value: number): void => {
    setRatioValue(value);
  };

  const sliderCompleteHandler = (value: number): void => {
    setMetricObject((prev: BrewMetricInterface) => {
      prev.ratio = ratioValue;
      prev.coffeeWeight = parseFloat(coffeeWeightValue);
      prev.waterWeight = parseFloat(waterWeightValue);
      return {...prev};
    });
  };

  const inputChangeHandler = (value: string): void => {
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

    ratioBaseCoffee
      ? setCoffeeWeightValue(() => checkLeading.toString())
      : setWaterWeightValue(() => checkLeading.toString());
  };

  return (
    <View style={styles.metricsContainer}>
      <View style={styles.spaceBetween}>
        <Card label="Grind:">
          <AppText>{grindParse(coffeeGrind)}</AppText>
        </Card>
        <Card label="Water Temp:" style={{alignItems: 'flex-end'}}>
          <AppText>{waterTemp} C</AppText>
        </Card>
      </View>
      <View style={styles.spaceBetween}>
        <Card
          label="Coffee:"
          style={{backgroundColor: ratioBaseCoffee ? 'darkgrey' : null}}
          onPress={() => setRatioBaseCoffee(true)}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[globalStyle.fontInput, styles.metricInput]}
              underlineColorAndroid={ratioBaseCoffee ? 'black' : 'transparent'}
              value={coffeeWeightValue}
              onChangeText={(e) => inputChangeHandler(e)}
              keyboardType="numeric"
              editable={ratioBaseCoffee}
            />
            <AppText style={globalStyle.fontHeaderTwo}> g</AppText>
          </View>
        </Card>
        <Card
          label="Water:"
          style={{backgroundColor: ratioBaseCoffee ? null : 'darkgrey'}}
          onPress={() => setRatioBaseCoffee(false)}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[globalStyle.fontInput, styles.metricInput]}
              underlineColorAndroid={ratioBaseCoffee ? 'transparent' : 'black'}
              value={waterWeightValue}
              onChangeText={(e) => inputChangeHandler(e)}
              keyboardType="numeric"
              editable={!ratioBaseCoffee}
            />
            <AppText style={globalStyle.fontHeaderTwo}> g</AppText>
          </View>
        </Card>
      </View>
      <Card label="Ratio:" style={{alignItems: 'center'}}>
        <AppText>1 : {ratioValue.toFixed(1)}</AppText>
        <Slider
          style={{width: '100%', height: 20}}
          minimumValue={14.0}
          maximumValue={20.0}
          step={0.1}
          value={ratio}
          onValueChange={(e) => sliderHandler(e)}
          onSlidingComplete={(e) => sliderCompleteHandler(e)}
        />
        <View style={styles.sliderContainer}>
          <AppText style={globalStyle.fontSmall}>Darker</AppText>
          <AppText style={globalStyle.fontSmall}>Lighter</AppText>
        </View>
      </Card>
    </View>
  );
};

export default MetricEdit;

const styles = StyleSheet.create({
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  metricsContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  stepListContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricInput: {
    paddingTop: 0,
    paddingHorizontal: 6,
    textAlign: 'center',
    color: 'black',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
