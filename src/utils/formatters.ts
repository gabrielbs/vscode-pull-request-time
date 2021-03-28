export const getAlertTextMessage = (gitDiffText: string) =>
  `What do you think about opening a Pull Request? 🥰\n~ You already have ${gitDiffText}`;

const sumAddedWithDeleted = (acc: number, curr: number) => {
  acc += curr;
  return acc;
};

export const getModificationsNumber = (modifications: string) => {
  return modifications
    .split(",")
    .slice(1)
    .map((item) => Number(item.replace(/[^0-9]+/g, "")))
    .reduce(sumAddedWithDeleted, 0);
};

export const formatCustomInterval = (interval?: number) =>
  interval ? 1000 * 60 * interval : 0;
