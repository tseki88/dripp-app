export interface StepInterface {
  id: number;
  stepType: number;
  // step type to be based off number
  notes: string;
  duration: number;
  targetWeight?: number;
  // mandatory label when custom step?
}

export interface brewMetricInterface {
  coffeeGrind: number;
  coffeeWeight: number;
  waterWeight: number;
  waterTemp: number;
  ratio: number;
}

export interface RecipeInterface {
  id: number;
  brewType: number;
  // for smaller local storage, brew types to be based off number
  name: string;
  metric: brewMetricInterface;
  steps: StepInterface[];
}

export type MainStackParamList = {
  Home: undefined;
  Timer: RecipeInterface;
  Recipe: RecipeInterface;
  AddStep: undefined;
}