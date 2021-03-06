export const MAX_MODIFICATIONS_NUMBER = 200;

export enum MESSAGE {
  openIt = "Open it 💜",
  snoozeForFive = "Snooze for 5 minutes",
  snoozeCustom = "Snooze for custom minutes",
}

export enum INTERVAL {
  default = 1000 * 5, // five seconds
  openIt = 1000 * 60 * 2, // two minutes
  fiveMinutes = 1000 * 60 * 5,
}

export type OptionSchemaType = {
  title: MESSAGE;
  interval?: INTERVAL;
};

export const optionsSchema: OptionSchemaType[] = [
  {
    title: MESSAGE.openIt,
    interval: INTERVAL.openIt,
  },
  { title: MESSAGE.snoozeForFive, interval: INTERVAL.fiveMinutes },
  { title: MESSAGE.snoozeCustom },
];
