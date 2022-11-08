export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomIntegerNumber = (length: number) =>
  Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);

export const randomItemInArray = (arr: unknown[]) => arr[Math.floor(Math.random() * arr.length)];
