import { sum, times } from "lodash";
import { loadInputSync } from "./helpers";

const contents = loadInputSync(6);
const fish: number[] = contents[0].split(",").map(v => Number(v));

function simulate(days: number) {
  const ages = times(9).sort().slice(1);
  const pool: Record<number, number> = Object.fromEntries(times(9, index => [index, 0]));
  // Populate with initial fish
  fish.forEach(current => { ++pool[current] });

  times(days, () => {
    // For each fish with age == 0, create new fish at age 8
    const numberToSpawn = pool[0];
    // Move each age category 1 down
    const tmpPool = { ...pool };
    ages.forEach(age => { pool[age - 1] = tmpPool[age] });
    pool[6] = pool[6] + tmpPool[0];
    pool[8] = numberToSpawn;
  });

  return sum(Object.values(pool));
}

function part1() {
  const result = simulate(80);
  console.log(`Day 6, part 1: ${result}`);
}

function part2() {
  const result = simulate(256);
  console.log(`Day 6, part 2: ${result}`);
}

part1();
part2();
