import Point from './types/Point';

const calculateAngleToXAxis = (point1: Point, point2: Point) => {
  if (point1.x === point2.x) {
    if (point2.y > point1.y) {
      return Math.PI / 2;
    } else {
      return 3 / 2 * Math.PI;
    }
  }

  if (point1.y === point2.y) {
    if (point2.x > point1.x) {
      return 0;
    } else {
      return Math.PI;
    }
  }

  const k = Math.atan(Math.abs((point2.y - point1.y) / (point2.x - point1.x)));
  if (point2.y > point1.y) {
    if (point2.x > point1.x) {
      return k;
    } else {
      return Math.PI - k;
    }
  } else {
    if (point2.x > point1.x) {
      return 3 / 2 * Math.PI + k;
    } else {
      return Math.PI + k;
    }
  }
};

export default calculateAngleToXAxis;
