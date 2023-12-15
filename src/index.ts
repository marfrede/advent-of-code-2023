import { readFileSync } from "fs";
import { HASH_MAP, hashMapRemove as remove, hashMapUpsert as upsert } from "./hash-map";
import { Step } from "./step.interface";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const mapToStep = (seq: string): Step => {
  const seqAsArr = seq.split(/-|=/);
  return { lensLabel: seqAsArr[0], focalLength: seqAsArr[1] ? +seqAsArr[1] : undefined };
};

const addUpFocusingPowers = (): number => {
  let power = 0;
  for (const box of HASH_MAP.entries()) {
    const [boxNr, steps] = box;
    power += steps.reduce((prevP, step, i) => prevP + (boxNr + 1) * (i + 1) * (step.focalLength ?? 0), 0);
  }
  return power;
};

const main = () => {
  const lines = getLines("./input.txt");
  const initSeqSteps: Step[] = lines[0].split(",").map((seq) => mapToStep(seq));
  initSeqSteps.forEach((step) => (step.focalLength === undefined ? remove(step.lensLabel) : upsert(step)));
  const focusingPower = addUpFocusingPowers();
  console.log("sum: ", focusingPower);
};

main();
