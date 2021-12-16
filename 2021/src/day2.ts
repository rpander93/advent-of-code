import { loadInputSync } from "./helpers";

const instructions = loadInputSync(2, false);

function part1() {
  const [horizontalPos, depthPos] = instructions.reduce(
    ([horizontalPos, depthPos], instruction) => {
      const [command, strAmount] = instruction.trim().split(" ");
      const amount = Number(strAmount);

      if ("forward" === command) return [horizontalPos + amount, depthPos];
      if ("down" === command) return [horizontalPos, depthPos + amount];

      return [horizontalPos, depthPos - amount];
    },
    [0, 0]
  );

  console.log(`Day 2, part 1: final horizontal is ${horizontalPos}, depth is ${depthPos}. Answer is ${horizontalPos * depthPos}`);
}

function part2() {
  const [horizontalPos, depthPos, _] = instructions.reduce(
    ([horizontalPos, depthPos, aim], instruction) => {
      const [command, strAmount] = instruction.trim().split(" ");
      const amount = Number(strAmount);

      if ("forward" === command) return [horizontalPos + amount, depthPos + aim * amount, aim];
      if ("down" === command) return [horizontalPos, depthPos, aim + amount];

      return [horizontalPos, depthPos, aim - amount];
    },
    [0, 0, 0]
  );

  console.log(`Day 2, part 2: final horizontal is ${horizontalPos}, depth is ${depthPos}. Answer is ${horizontalPos * depthPos}`);
}

part1();
part2();
