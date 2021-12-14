import { sum } from "lodash";
import { loadInputSync } from "./helpers";

const contents = loadInputSync(3);
const numberOfLines = contents.length;
const numberOfBits = 12;

function part1() {
  const gammaRateBits: number[] = [];
  for (let i = 0; i < numberOfBits; ++i) {
    const sumOfColumn = sum(contents.map(line => Number(line[i])));
    gammaRateBits.push(sumOfColumn >= (numberOfLines / 2) ? 1 : 0);
  }

  const gammaRate = Number.parseInt(gammaRateBits.join(""), 2);
  const epsilonRate = Number.parseInt(reverseBits(gammaRateBits).join(""), 2);

  function reverseBits(bits: number[]) {
    return bits.map(bit => 1 === bit ? 0 : 1);
  }

  console.log(`Day 3, part 1: gamma rate ${gammaRate}, epsilon rate: ${epsilonRate}, answer is ${gammaRate * epsilonRate}`);
}

function part2() {
  // ..
}

// ..