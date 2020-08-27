const grindParse = (value: number) => {
  switch (value) {
    case 0:
      return 'Extra Coarse';
    case 1:
      return 'Coarse';
    case 2:
      return 'Medium Coarse';
    case 3:
      return 'Medium';
    case 4:
      return 'Medium Fine';
    case 5:
      return 'Fine';
    case 6:
      return 'Extra Fine';
    default:
      break;
  }
}

export default grindParse;
