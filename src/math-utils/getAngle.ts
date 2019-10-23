import Point from './types/Point';

const getAngle = (point1: Point, point2: Point) => {
  return (Math.atan2(point2.y - point1.y, point2.x - point1.x) + 2 * Math.PI) % (2 * Math.PI);
};

export default getAngle;
