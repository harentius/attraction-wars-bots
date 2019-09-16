import Circle from '../storage/Circle';

const calculateDistance = (circle1: Circle, circle2: Circle): number => {
  return Math.sqrt(
    (circle1.x - circle2.x) ** 2
    + (circle1.y - circle2.y) ** 2,
  ) - circle1.r - circle2.r;
};

export default calculateDistance;
