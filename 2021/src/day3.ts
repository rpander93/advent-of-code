import { sum, times } from "lodash";
import { loadInputSync } from "./helpers";

const contents = loadInputSync(3);
const numberOfBits = contents[0].length; // assume constant length for all lines

function part1() {
  const gammaRateBits = times(numberOfBits, (index) => mostFrequentInColumn(contents, index, 1));
  const gammaRate = Number.parseInt(gammaRateBits.join(""), 2);
  const epsilonRate = Number.parseInt(reverseBits(gammaRateBits).join(""), 2);

  console.log(`Day 3, part 1: gamma rate ${gammaRate}, epsilon rate: ${epsilonRate}, answer is ${gammaRate * epsilonRate}`);
}

function part2() {
  function findRatingValue(criterium: "common" | "least-common") {
    let candidates: string[] = [...contents];

    for (let i = 0; i < numberOfBits; ++i) {
      const mostCommonInColumn = mostFrequentInColumn(candidates, i, 1);
      const comparisonVal = "common" === criterium ? mostCommonInColumn : Number(!Boolean(mostCommonInColumn));

      candidates = candidates.filter(value => Number(value[i]) === comparisonVal);
      if (candidates.length === 1) break;
    }

    return candidates[0];
  }

  const oxygenGeneratorRating = Number.parseInt(findRatingValue("common"), 2);
  const co2ScrubberRating = Number.parseInt(findRatingValue("least-common"), 2);

  console.log(`Day 3, part 2: oxygen generator ${oxygenGeneratorRating}, CO2 scrubber ${co2ScrubberRating}, answer is ${oxygenGeneratorRating * co2ScrubberRating}`);
}

function mostFrequentInColumn(lines: string[], column: number, stalemateWinner: number) {
  const sumOfColumn = sum(lines.map(line => Number(line[column])));

  if (sumOfColumn === lines.length / 2) return stalemateWinner;
  return sumOfColumn > lines.length / 2 ? 1 : 0;
}

function reverseBits(bits: number[]) {
  return bits.map(bit => 1 === bit ? 0 : 1);
}

part1();
part2();
