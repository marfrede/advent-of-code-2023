import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const calcHashAlg = (str: string = "rn=1"): number => {
  let curVal = 0;
  for (let i = 0; i < str.length; i++) {
    const ascii = str.charCodeAt(i);
    curVal += ascii;
    curVal *= 17;
    curVal %= 256;
  }
  return curVal;
};

const main = () => {
  const lines = getLines("./input.txt");
  const initSeqSteps = lines[0].split(",");
  const sum = initSeqSteps.reduce((prevSum, seq) => {
    return prevSum + calcHashAlg(seq);
  }, 0);
  console.log("sum: ", sum);
};

main();
