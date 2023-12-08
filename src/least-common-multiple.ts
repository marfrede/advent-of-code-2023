const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

export const lcmMultiple = (numbers: number[]) => {
  let res = lcm(numbers[0], numbers[1]);
  for (let i = 2; i < numbers.length; i++) {
    res = lcm(res, numbers[i]);
  }
  return res;
};
