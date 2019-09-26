import each from 'jest-each';
import calculateAngleToXAxis from '../../src/math-utils/calculateAngleToXAxis';
import Point from '../../src/math-utils/types/Point';

each([
  // TOP
  [{x: 5, y: 3}, {x: 5, y: 10}, Math.PI / 2],
  // DOWN
  [{x: 5, y: 10}, {x: 5, y: 3}, 3 / 2 * Math.PI],
  // LEFT
  [{x: 5, y: 3}, {x: 10, y: 3}, 0],
  // RIGHT
  [{x: 10, y: 3}, {x: 5, y: 3}, Math.PI],
  // TOP RIGHT
  [{x: 5, y: 5}, {x: 10, y: 10}, Math.PI / 4],
  // DOWN LEFT
  [{x: 10, y: 10}, {x: 5, y: 5}, 5 / 4 * Math.PI],
  // TOP LEFT
  [{x: -5, y: 5}, {x: -10, y: 10}, 3 / 4 * Math.PI],
  // DOWN RIGHT
  [{x: 5, y: -5}, {x: 10, y: -10}, 7 / 4 * Math.PI],
]).test('Calculate Angle To X Axis', (point1: Point, point2: Point, expectedAngle: number) => {
  const angle = calculateAngleToXAxis(point1, point2);

  expect(angle).toEqual(expectedAngle);
});
