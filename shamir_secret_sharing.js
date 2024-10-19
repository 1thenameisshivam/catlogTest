import BigNumber from "bignumber.js";
import { testCase1 } from "./testCase1.js";
import { testCase2 } from "./testCase2.js";
function decodeValue(value, base) {
  return new BigNumber(value, base);
}

function lagrangeInterpolation(points) {
  return function (x) {
    return points.reduce((sum, [xi, yi], i) => {
      let li = new BigNumber(yi);
      for (let j = 0; j < points.length; j++) {
        if (i !== j) {
          li = li
            .multipliedBy(x.minus(points[j][0]))
            .dividedBy(xi.minus(points[j][0]));
        }
      }
      return sum.plus(li);
    }, new BigNumber(0));
  };
}

function findSecret(data) {
  const k = data.keys.k;
  const points = [];

  for (let i = 1; i <= k; i++) {
    const x = new BigNumber(i);
    const y = decodeValue(data[i].value, parseInt(data[i].base));
    points.push([x, y]);
  }

  const polynomial = lagrangeInterpolation(points);
  return polynomial(new BigNumber(0)).integerValue().toString();
}

const secret1 = findSecret(testCase1);
const secret2 = findSecret(testCase2);

console.log(`Secret for Test Case 1: ${secret1}`);
console.log(`Secret for Test Case 2: ${secret2}`);
