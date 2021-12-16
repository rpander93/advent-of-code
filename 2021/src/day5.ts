import { times } from "lodash";
import { loadInputSync } from "./helpers";

type Coordinate = [number, number]; // X, Y
type Segment = { origin: Coordinate, destination: Coordinate };

const contents = loadInputSync(5);
const segments = contents.map(segment => {
  const values = segment.split(" -> ").map(element => element.split(",").map(v => Number(v)));
  return { origin: values[0], destination: values[1] } as Segment;
});

function part1() {
  const diagram = createDiagramFromSegments(
    segments
      .filter(segment => segment.origin[0] === segment.destination[0] || segment.origin[1] === segment.destination[1])
  );

  // Find coordinates where number >= 2
  const answer = [...diagram.entries()].reduce((accumulator, [_, amount]) => amount >= 2 ? accumulator + 1 : accumulator, 0);
  console.log(`Day 5, part 1: Have ${answer} coordinates with 2 or more line segments`);
}

function part2() {
  const diagram = createDiagramFromSegments(segments);

  // Find coordinates where number >= 2
  const answer = [...diagram.entries()].reduce((accumulator, [_, amount]) => amount >= 2 ? accumulator + 1 : accumulator, 0);
  console.log(`Day 5, part 2: Have ${answer} coordinates with 2 or more line segments`);
}

function createDiagramFromSegments(segments: Segment[]): Map<string, number> {
  const diagram = new Map<string, number>();
  
  // Add all points to diagram
  segments.forEach(segment => {
    createPointsFromSegment(segment).forEach(point => {
      diagram.set(point.join(), (diagram.get(point.join()) ?? 0) + 1);
    });
  });

  return diagram;
}

function sign(value: number) {
  if (value === 0) return 0;
  return value > 0 ? 1 : -1;
}

// (2, 0) --> (6, 4) === (2, 0), (3, 1), (4, 2), (5, 3), (6, 4)
// (1, 1) --> (1, 3) === (1, 1), (1, 2), (1, 3)
function createPointsFromSegment({ origin, destination }: Segment): Coordinate[] {
  const diffY = destination[1] - origin[1];
  const diffX = destination[0] - origin[0];

  const stepY = sign(diffY);
  const stepX = sign(diffX);

  return [
    ...times(Math.max(Math.abs(diffY), Math.abs(diffX)), index => [origin[0] + (stepX * index), origin[1] + (stepY * index)] as Coordinate),
    destination
  ];
}

part1();
part2();
