import { loadInputSync } from "./helpers";

const SYNTAX_TOKENS = { "(": ")", "[": "]", "<": ">", "{": "}" } as const;
const OPENING_TOKENS = Object.keys(SYNTAX_TOKENS) as Array<keyof typeof SYNTAX_TOKENS>;
const CLOSING_TOKENS = Object.values(SYNTAX_TOKENS);
const ILLEGAL_POINTS = { ")": 3, "]": 57, "}": 1197, ">": 25137 } as const;
const MISSING_POINTS = { ")": 1, "]": 2, "}": 3, ">": 4 } as const;

type OPENING_TOKEN = typeof OPENING_TOKENS[number];
type CLOSING_TOKEN = typeof CLOSING_TOKENS[number];
type LEGAL_TOKEN = typeof OPENING_TOKENS[number] | typeof CLOSING_TOKENS[number];

function middle(values: number[]) {
  return [...values].sort((a, b) => b - a)[(values.length - 1) / 2];
}

function isAppropriate(opener: OPENING_TOKEN, closer: CLOSING_TOKEN) {
  return SYNTAX_TOKENS[opener] === closer;
}

function isOpeningToken(value: LEGAL_TOKEN): value is OPENING_TOKEN {
  return OPENING_TOKENS.includes(value as any);
}

function isClosingToken(value: LEGAL_TOKEN): value is CLOSING_TOKEN {
  return CLOSING_TOKENS.includes(value as any);
}

function isCorrupt(line: string): [boolean, number] {
  const openingTokens: Array<keyof typeof SYNTAX_TOKENS> = [];

  for (let index = 0; index < line.length; ++index) {
    const character = line[index] as LEGAL_TOKEN;

    if (isOpeningToken(character)) {
      openingTokens.push(character);
    }

    if (isClosingToken(character)) {
      const prevOpeningToken = openingTokens[openingTokens.length - 1];

      if (!isAppropriate(prevOpeningToken, character)) return [true, index];
      openingTokens.pop();
    }
  }

  return [false, 0];
}

function isIncomplete(line: string): [boolean, CLOSING_TOKEN[]] {
  const openingTokens: Array<keyof typeof SYNTAX_TOKENS> = [];

  for (let index = 0; index < line.length; ++index) {
    const character = line[index] as LEGAL_TOKEN;

    if (isOpeningToken(character)) {
      openingTokens.push(character);
    }

    if (isClosingToken(character)) {
      const prevOpeningToken = openingTokens[openingTokens.length - 1];

      if (!isAppropriate(prevOpeningToken, character)) return [false, []]; // line is corrupt
      openingTokens.pop();
    }
  }

  if (openingTokens.length === 0) return [false, []]; // line is balanced
  return [true, openingTokens.reverse().map(character => SYNTAX_TOKENS[character])];
}

const contents = loadInputSync(10);
const syntaxErrorScore = contents.reduce((accumulator, line) => {
  const [corrupt, atIndex] = isCorrupt(line);
  if (false === corrupt) return accumulator;

  const atToken = line[atIndex] as CLOSING_TOKEN;
  return accumulator + ILLEGAL_POINTS[atToken];
}, 0);

console.log(`Day 10, part 1: syntax error score is ${syntaxErrorScore}`);

const imbalancedScores = contents.reduce((scores, line) => {
  const [imbalanced, missingTokens] = isIncomplete(line);
  if (false === imbalanced) return scores;

  return [...scores, missingTokens.reduce((sum, token) => (sum * 5) + MISSING_POINTS[token], 0)];
}, [] as number[]);

console.log(`Day 10, part 2: imbalanced error score is ${middle(imbalancedScores)}`);
