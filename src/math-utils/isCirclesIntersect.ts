import * as circleCircle from 'intersects/circle-circle';

const isCirclesIntersect = (circle1, circle2): boolean => {
  return circleCircle(circle1.x, circle1.y, circle1.r, circle2.x, circle2.y, circle2.r);
};

export default isCirclesIntersect;
