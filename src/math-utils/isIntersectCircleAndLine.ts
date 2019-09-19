import Circle from './types/Circle';
import Line from './types/Line';

const isIntersectCircleAndLine = (circle: Circle, line: Line): boolean => {
  if (line.x === null || line.x === undefined) {
    const k = line.b - circle.y;

    return Math.pow(2 * k * line.a - 2 * circle.x, 2)
      >= 4 * (1 + Math.pow(line.a, 2)) * (Math.pow(circle.x, 2) + Math.pow(k, 2) - Math.pow(circle.r, 2));
  } else {
    return Math.pow(circle.r, 2) >= Math.pow(line.x - circle.x, 2);
  }
};

export default isIntersectCircleAndLine;
