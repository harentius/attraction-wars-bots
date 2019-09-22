import each from 'jest-each';
import buildDirectionalLines from '../../src/math-utils/buildDirectionalLines';
import Circle from '../../src/math-utils/types/Circle';
import Line from '../../src/math-utils/types/Line';
import Direction from '../../src/math-utils/types/Direction';

const normalizeNumbersPrecision = (objects: object[], precision = 2) => {
  const normalizedData = [];

  for (const element of objects) {
    const res = {};

    for (const [key, value] of Object.entries(element)) {
      res[key] = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    normalizedData.push(res);
  }

  return normalizedData;
};

each([
  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_RIGHT},
    [{x1: 5, y1: 4, x2: 7, y2: 4}, {x1: 5, y1: 8, x2: 7, y2: 8}],
  ],

  [
    {x: 5, y: 6, r: 2.12},
    {direction: Direction.DIRECTION_TOP_RIGHT},
    [{x1: 6.5, y1: 4.5, x2: 8, y2: 6}, {x1: 3.5, y1: 7.5, x2: 5, y2: 9}],
  ],

  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_TOP},
    [{x1: 3, y1: 6, x2: 3, y2: 8}, {x1: 7, y1: 6, x2: 7, y2: 8}],
  ],

  [
    {x: 5, y: 6, r: 2.12},
    {direction: Direction.DIRECTION_TOP_LEFT},
    [{x1: 3.5, y1: 4.5, x2: 2, y2: 6}, {x1: 6.5, y1: 7.5, x2: 5, y2: 9}],
  ],

  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_LEFT},
    [{x1: 5, y1: 4, x2: 3, y2: 4}, {x1: 5, y1: 8, x2: 3, y2: 8}],
  ],

  [
    {x: 5, y: 6, r: 2.12},
    {direction: Direction.DIRECTION_DOWN_LEFT},
    [{x1: 6.5, y1: 4.5, x2: 5, y2: 3}, {x1: 3.5, y1: 7.5, x2: 2, y2: 6}],
  ],

  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_DOWN},
    [{x1: 3, y1: 6, x2: 3, y2: 4}, {x1: 7, y1: 6, x2: 7, y2: 4}],
  ],
]).test('Build Directional Lines', (circle: Circle, direction: Direction, expectedLines: Line[]) => {
  const directionalLines = normalizeNumbersPrecision(buildDirectionalLines(circle, direction));

  expect(directionalLines).toEqual(expectedLines);
});
