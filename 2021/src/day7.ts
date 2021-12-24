import { sum } from "lodash";
import { loadInputSync } from "./helpers";

const contents = loadInputSync(7);
const positions = contents[0].split(",").map(v => Number(v));

function median(numbers: number[]) {
  const values = [...numbers].sort((a, b) => a - b);

  if (values.length % 2 !== 0) return values[(values.length - 1) / 2];
  return (values[values.length / 2] + values[(values.length / 2) - 1]) / 2;
}

function average(numbers: number[]) {
  return sum(numbers) / numbers.length;
}

function triangular(value: number) {
  return value * (value + 1) / 2;
}

function part1() {
  const position = median(positions);
  const fuel = sum(positions.map(v => Math.abs(v - position)));

  console.log(`Day 7, part 1: position is ${position} with a fuel requirement of ${fuel}`);
}

function part2() {
  const position = Math.floor(average(positions));
  const fuel = positions.reduce((accumulator, current) => triangular(Math.abs(current - position)) + accumulator, 0);

  console.log(`Day 7, part 2: position is ${position} with a fuel requirement of ${fuel}`);
}

part1();
part2();
