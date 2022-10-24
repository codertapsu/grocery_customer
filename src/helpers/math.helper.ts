export const randomIntFrom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomItemInArray = (arr: unknown[]) => arr[Math.floor(Math.random() * arr.length)];
