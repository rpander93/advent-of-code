import { flatten, times } from "lodash";
import { loadInputSync } from "./helpers";

type Coordinate = [number, number];

const contents = loadInputSync(11);
const grid = new Map<string, number>();

function writeCoordinate(coordinate: Coordinate, value: number) {
  grid.set(coordinate.join(", "), value);
}

function readCoordinate(coordinate: Coordinate) {
  return grid.get(coordinate.join(", "));
}

function printGrid() {
  const points = [...grid.keys()].map(point => point.split(",").map(Number) as Coordinate);
  const width = Math.max(...points.map(point => point[0])) + 1;  // highest X
  const height = Math.max(...points.map(point => point[1])) + 1; // highest Y

  times(height, y => {
    const row = times(width, x => readCoordinate([x, y]));
    console.log(row.join(""));
  });
}

function findAdjacents([x, y]: Coordinate) {
  const adjacents: Coordinate[] = [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y],     /* x, y */  [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ];

  return adjacents.filter(v => undefined !== readCoordinate(v));
}

function resetGrid() {
  // populate heights
  contents.forEach((line, yPos) => {
    line.split("").forEach((element, xPos) => {
      writeCoordinate([xPos, yPos], Number(element));
    }); 
  });
}

function processStep(_step: number) {
  const flashedInStep: Coordinate[] = [];

  function recursive(point: Coordinate) {
    if (undefined !== flashedInStep.find(v => v[0] === point[0] && v[1] === point[1])) return;
    const level = readCoordinate(point) as number;

    if (level < 9) return writeCoordinate(point, level + 1); // no flash needed. next level <= 9

    // level >= 9. flash and update adjacents
    flashedInStep.push(point);
    writeCoordinate(point, 0);

    findAdjacents(point).forEach(adjacent => {
      recursive(adjacent);
    });
  }

  positions.forEach(position => {
    recursive(position);
  });

  return flashedInStep;
}

const positions = flatten(times(contents.length, yPos => times(contents[yPos].length, xPos => [xPos, yPos] as Coordinate)));

// part 1
resetGrid();
const numberOfFlashes = times(100).reduce((accumulator, _, step) => accumulator + processStep(step).length, 0);
console.log(`Day 11, answer to part 1: ${numberOfFlashes}`);

// part 2
let index = 0;
while (true === true) {
  if (processStep(index + 100).length === positions.length) break;
  index += 1;
}

console.log(`Day 11, answer to part 2: ${index + 100 + 1}`);
