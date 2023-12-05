import { DIGITS, STR_DIGITS } from "./digits";

export const mapStrToNumberDigit = (strDigit: string | undefined): number => {
  if (strDigit === undefined) {
    throw Error("no number found!");
  }
  if (isNaN(+strDigit)) {
    return DIGITS[STR_DIGITS.findIndex((strD) => strD === strDigit)];
  }
  return +strDigit;
};
