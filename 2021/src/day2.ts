import { loadInputSync } from "./helpers";

const instructions = loadInputSync(2, false);

function part1() {
  let horizontalPos = 0;
  let depthPos = 0;

  instructions.forEach(instruction => {
    const [command, strAmount] = instruction.trim().split(" ");
    const amount = Number(strAmount);

    if ("forward" === command) horizontalPos += amount;
    if ("down" === command) depthPos += amount;
    if ("up" === command) depthPos -= amount;
  });

  console.log(`Day 2, part 1: final horizontal is ${horizontalPos}, depth is ${depthPos}. Answer is ${horizontalPos * depthPos}`);
}

function part2() {
  let horizontalPos = 0;
  let depthPos = 0;
  let aim = 0;

  instructions.forEach(instruction => {
    const [command, strAmount] = instruction.trim().split(" ");
    const amount = Number(strAmount);

    if ("forward" === command) {
      horizontalPos += amount;
      depthPos += aim * amount;
    }

    if ("down" === command) aim += amount;
    if ("up" === command) aim -= amount;
  });

  console.log(`Day 2, part 2: final horizontal is ${horizontalPos}, depth is ${depthPos}. Answer is ${horizontalPos * depthPos}`);
}

part1();
part2();
