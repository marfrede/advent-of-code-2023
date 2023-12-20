import { getMinSurrounding, initLines } from "./matrix.helper";

const main = () => {
  initLines("./input.txt");
  console.log(getMinSurrounding(0, 0));
  console.log(getMinSurrounding(3, 8));
};

main();
