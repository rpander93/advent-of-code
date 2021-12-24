import { every, flatten, sum, times } from "lodash";
import { loadInputSync } from "./helpers";

type Coordinate = [number, number];

const contents = loadInputSync(9);
const heights = new Map<string, number>();

function writeCoordinate(coordinate: Coordinate, value: number) {
  heights.set(coordinate.join(", "), value);
}

function readCoordinate(coordinate: Coordinate) {
  return heights.get(coordinate.join(", "));
}

function findAdjacents([x, y]: Coordinate) {
  const adjacents = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]] as Coordinate[];
  return adjacents.filter(v => undefined !== readCoordinate(v));
}

function isLowest(value: number, comparisons: number[]) {
  return every(comparisons, v => v > value);
}

// populate heights
contents.forEach((line, yPos) => {
  line.split("").forEach((element, xPos) => {
    writeCoordinate([xPos, yPos], Number(element));
  }); 
});

// find low points
const positions = flatten(times(contents.length, yPos => times(contents[yPos].length, xPos => [xPos, yPos] as Coordinate)));
const lowestPoints = positions.filter(position => isLowest(readCoordinate(position) as number, findAdjacents(position).map(v => readCoordinate(v) as number)));
const riskLevels = sum(lowestPoints.map(point => (readCoordinate(point) as number) + 1));

console.log(`Day 9, part 1: answer is ${riskLevels}`);

// for each low point, find the size of their basins
// for each point, find each adjacent point <= 8 and repeat. count unique points
const basins = lowestPoints.map(point => {
  function recursive(start: Coordinate): Coordinate[] {
    const current = readCoordinate(start) as number;
    const adjacents = findAdjacents(start).filter(v => {
      const value = readCoordinate(v) as number;
      return value <= 8 && value > current;
    });

    // base case
    if (adjacents.length === 0) return [];
    // recursive case
    return [...adjacents, ...adjacents.flatMap(adjacent => recursive(adjacent))];
  }

  function unique(points: Coordinate[]) {
    return points.filter((value, index) => every(points.slice(index + 1), v => v[0] !== value[0] || v[1] !== value[1]));
  }

  return unique([point, ...recursive(point)]);
});

const basinSizes = basins.map(b => b.length).sort((a, b) => b - a); 
console.log(`Day 9, part 2: answer is `, basinSizes.slice(0, 3).reduce((acc, curr) => acc * curr, 1));
