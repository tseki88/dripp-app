const calcTemp = (tempValue: number, tempCelsius: boolean): string => {
  let renderValue: number;

  tempCelsius
    ? (renderValue = Math.round((tempValue * 5) / 9))
    : (renderValue = tempValue + 32);

  return renderValue.toString();
};

export default calcTemp;
