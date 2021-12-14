import { times, zip } from "lodash";
import { loadInputSync } from "./helpers";

const measurements = loadInputSync(1).map(v => Number(v));

console.log(`Have ${measurements.length} depth measurements`);

function createLaggedSeries(input: number[], lags: number) {
  return times(lags, (index) => {
    return [...times(index + 1), ...input];
  });
}

function part1() {
  const numberOfIncreases = zip(measurements, ...createLaggedSeries(measurements, 1))
    .slice(1, measurements.length)
    .reduce((accumulator, [measurement, prevMeasurement]) => (measurement as number) > (prevMeasurement as number) ? accumulator + 1 : accumulator, 0);

  console.log(`Day 1, part 1: number of increasing depths: ${numberOfIncreases}`);
}

function part2() {
  const numberOfIncreases = zip(measurements, ...createLaggedSeries(measurements, 3))
    .slice(3, measurements.length)
    .reduce((accumulator, [measurement, laggedOnce, laggedTwice, laggedThrice]) => {
      const currentWindow = (measurement as number) + (laggedOnce as number) + (laggedTwice as number);
      const prevWindow = (laggedOnce as number) + (laggedTwice as number) + (laggedThrice as number);

      return currentWindow > prevWindow ? accumulator + 1 : accumulator;
    }, 0);

    console.log(`Day 1, part 2: number of increasing depths: ${numberOfIncreases}`);
}

part1();
part2();
