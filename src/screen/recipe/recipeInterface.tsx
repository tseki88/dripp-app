export interface StepsInterface {
  [index: number]: {
    id: number;
    stepType: number;
    // step type to be based off number
    notes?: string;
    duration: number;
    targetWeight?: number;
    // mandatory label when custom step?
  };
}

export interface brewMetricInterface {
  coffeeGrind: number;
  coffeeWeight: number;
  waterWeight: number;
  waterTemp: number;
  ratio: number;
}

export interface RecipeInterface {
  brewType: number;
  // for smaller local storage, brew types to be based off number
  name: string;
  metric: brewMetricInterface;
  steps: StepsInterface;
}
