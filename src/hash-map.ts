import { Step } from "./step.interface";

export const HASH_MAP = new Map<number, Step[]>();

export const hashMapRemove = (lensLabel: string): void => {
  const hash = getHash(lensLabel);
  const lensesInBox = HASH_MAP.get(hash);
  if (!lensesInBox || !lensesInBox.length) return;
  arrayRemove(hash, lensesInBox, lensLabel);
};

export const hashMapUpsert = (step: Step) => {
  const hash = getHash(step.lensLabel);
  const lensesInBox = HASH_MAP.get(hash);
  if (!lensesInBox || !lensesInBox.length) {
    HASH_MAP.set(hash, [step]);
  } else {
    lensesInBox.find((lens) => lens.lensLabel === step.lensLabel)
      ? arrayUpdate(hash, lensesInBox, step)
      : arrayInsert(hash, lensesInBox, step);
  }
};

const arrayInsert = (at: number, array: Step[], newElem: Step) => {
  HASH_MAP.set(at, [...array, newElem]);
};

const arrayRemove = (at: number, array: Step[], label: string) => {
  const arrayAfterRemove = array.filter((lens) => lens.lensLabel !== label);
  HASH_MAP.set(at, arrayAfterRemove);
};

const arrayUpdate = (at: number, array: Step[], step: Step) => {
  const arrayUpdated = array.map((lens) =>
    lens.lensLabel === step.lensLabel ? { ...lens, focalLength: step.focalLength } : lens
  );
  HASH_MAP.set(at, arrayUpdated);
};

const getHash = (str: string = "rn=1"): number => {
  let curVal = 0;
  for (let i = 0; i < str.length; i++) {
    const ascii = str.charCodeAt(i);
    curVal += ascii;
    curVal *= 17;
    curVal %= 256;
  }
  return curVal;
};
