import each from 'jest-each';
import isIntersectCircleAndLine from '../../src/math-utils/isIntersectCircleAndLine';

each([
  [true, { x: 0, y: 0, r: 0 }, {a: 0, b: 0}],
  [true, { x: 5, y: 10, r: 3 }, {a: 2, b: 5}],
  [false, { x: 5, y: 10, r: 3 }, {a: 2, b: 7}],
  [false, { x: 5, y: 10, r: 3 }, {a: 2, b: 7}],
  [true, { x: 5, y: 10, r: 3 }, {a: -2, b: 14}],
  [true, { x: 5, y: 10, r: 3 }, {a: -1, b: 14}],
  [false, { x: 5, y: 10, r: 0.5 }, {a: -1, b: 14}],
  [true, { x: 5, y: 10, r: 5 }, {a: 0, b: 15}],
  [false, { x: 5, y: 10, r: 5 }, {a: 0, b: 16}],
  [true, { x: 5, y: 10, r: 5 }, {x: 9}],
  [true, { x: 5, y: 10, r: 5 }, {x: 10}],
  [false, { x: 5, y: 10, r: 5 }, {x: 11}],
]).test('isIntersectCircleAndLine', (isIntersect, circle, line) => {
  expect(isIntersectCircleAndLine(circle, line)).toBe(isIntersect);
});
