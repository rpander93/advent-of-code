import { every, flatten, sum } from "lodash";
import { loadInputSync } from "./helpers";

type Board = (number | "X")[][];

const [numbersStr, _, ...boardsStrs] = loadInputSync(4);
const numbers = numbersStr.split(",").map(v => Number(v));

let boards: Board[] = [];
for (let i = 0, boardIndex = 0; i < boardsStrs.length; ++i) {
  const line = boardsStrs[i];
  if ("" === line) { ++boardIndex; continue; };
  if (boards.length < boardIndex + 1) boards.push([]);
  boards[boardIndex].push(line.trim().split(" ").filter(v => v.length > 0).map(v => Number(v)));
}

numbers.forEach(number => {
  // Mark the number as "X" on all boards
  boards.forEach(board => {
    for (let x = 0; x < board[0].length; ++x) {
      for (let y = 0; y < board.length; ++y) {
        if (board[y][x] === number) board[y][x] = "X";
      }
    }
  });

  // Check if any board is valid
  boards.forEach((board, boardIndex) => {
    [board, transpose(board)].forEach(possibility => {
      possibility.forEach(row => {
        if (every(row, v => v === "X")) {
          console.log(`Board with index ${boardIndex} is valid`);
          console.log(`--> with value ${sum(flatten(possibility).filter(v => v !== "X")) * number}`);

          // Remove board from list
          boards.splice(boardIndex, 1);
        }
      });
    });
  });
});

function transpose(matrix: unknown[][]) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}