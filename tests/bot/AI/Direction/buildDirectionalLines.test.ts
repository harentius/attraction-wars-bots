import each from 'jest-each';
import buildDirectionalLines from '../../../../src/bot/AI/Direction/buildDirectionalLines';
import Circle from '../../../../src/math-utils/types/Circle';
import Line from '../../../../src/math-utils/types/Line';
import Direction from '../../../../src/bot/AI/Direction/Direction';

const normalizeNumbersPrecision = (objects: object[], precision = 2) => {
  const normalizedData = [];

  for (const element of objects) {
    const res = {};

    for (const [key, value] of Object.entries(element)) {
      if (key === 'direction') {
        res[key] = value;
      } else {
        res[key] = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
      }
    }

    normalizedData.push(res);
  }

  return normalizedData;
};

each([
  [
    {x: 5, y: 6, r: 2},
    Direction.DIRECTION_RIGHT,
    [
      {x1: 5, y1: 4, x2: 407, y2: 4},
      {x1: 5, y1: 8, x2: 407, y2: 8},
    ],
  ],

  [
    {x: 5, y: 6, r: 2.12},
    Direction.DIRECTION_TOP_RIGHT,
    [
      {x1: 6.5, y1: 4.5, x2: 290.84, y2: 288.84},
      {x1: 3.5, y1: 7.5, x2: 287.84, y2: 291.84},
    ],
  ],

  [
    {x: 5, y: 6, r: 2},
    Direction.DIRECTION_TOP,
    [
      {x1: 3, y1: 6, x2: 3, y2: 408},
      {x1: 7, y1: 6, x2: 7, y2: 408},
      ],
  ],

  [
    {x: 5, y: 6, r: 2.12},
    Direction.DIRECTION_TOP_LEFT,
    [
      {x1: 3.5, y1: 4.5, x2: -280.84, y2: 288.84},
      {x1: 6.5, y1: 7.5, x2: -277.84, y2: 291.84},
    ],
  ],

  [
    {x: 5, y: 6, r: 2},
    Direction.DIRECTION_LEFT,
    [
      {x1: 5, y1: 4, x2: -397, y2: 4},
      {x1: 5, y1: 8, x2: -397, y2: 8},
    ],
  ],

  [
    {x: 5, y: 6, r: 2.12},
    Direction.DIRECTION_DOWN_LEFT,
    [
      {x1: 6.5, y1: 4.5, x2: -277.84, y2: -279.84},
      {x1: 3.5, y1: 7.5, x2: -280.84, y2: -276.84},
    ],
  ],

  [
    {x: 5, y: 6, r: 2},
    Direction.DIRECTION_DOWN,
    [
      {x1: 3, y1: 6, x2: 3, y2: -396},
      {x1: 7, y1: 6, x2: 7, y2: -396},
    ],
  ],

  [
    {x: 5, y: 6, r: 2.12},
    Direction.DIRECTION_DOWN_RIGHT,
    [
      {x1: 3.5, y1: 4.5, x2: 287.84, y2: -279.84},
      {x1: 6.5, y1: 7.5, x2: 290.84, y2: -276.84},
    ],
  ],
]).test('Build Directional Lines', (circle: Circle, direction: number, expectedLines: Line[]) => {
  const directionalLines = normalizeNumbersPrecision(buildDirectionalLines(circle, direction, 400));

  expect(directionalLines).toEqual(expectedLines);
});
