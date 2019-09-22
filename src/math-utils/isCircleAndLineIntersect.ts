import * as lineCircle from 'intersects/line-circle';
import Circle from './types/Circle';
import Line from './types/Line';

const isCircleAndLineIntersect = (circle: Circle, line: Line): boolean => {
  return lineCircle(line.x1, line.y1, line.x2, line.y2, circle.x, circle.y, circle.r);
};

export default isCircleAndLineIntersect;
