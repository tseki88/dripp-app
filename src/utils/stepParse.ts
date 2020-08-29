const stepParse = (value: number):string => {
  switch (value) {
    case 0:
      return 'Bloom';
    case 1:
      return 'Pour';
    case 2:
      return 'Wait';
    case 3:
      return 'Stir';
    case 4:
      return 'Swirl';
    case 5:
      return 'Custom Step';
    default:
      return '-';
  }
}

export default stepParse;
