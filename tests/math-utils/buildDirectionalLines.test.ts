import each from 'jest-each';
import buildDirectionalLines from '../../src/math-utils/buildDirectionalLines';
import Circle from '../../src/math-utils/types/Circle';
import Line from '../../src/math-utils/types/Line';
import Direction from '../../src/math-utils/types/Direction';

each([
  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_RIGHT},
    [{x1: 5, y1: 4, x2: 7, y2: 4}, {x1: 5, y1: 8, x2: 7, y2: 8}],
  ],

  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_TOP},
    [{x1: 3, y1: 6, x2: 3, y2: 8}, {x1: 7, y1: 6, x2: 7, y2: 8}],
  ],

  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_LEFT},
    [{x1: 5, y1: 4, x2: 3, y2: 4}, {x1: 5, y1: 8, x2: 3, y2: 8}],
  ],

  [
    {x: 5, y: 6, r: 2},
    {direction: Direction.DIRECTION_DOWN},
    [{x1: 3, y1: 6, x2: 3, y2: 4}, {x1: 7, y1: 6, x2: 7, y2: 4}],
  ],
]).test('Build Directional Lines', (circle: Circle, direction: Direction, expectedLines: Line[]) => {
  const directionalLines = buildDirectionalLines(circle, direction);
  expect(directionalLines).toEqual(expectedLines);
});
