import Line from './types/Line';
import Circle from './types/Circle';
import Direction from './types/Direction';

const buildDirectionalLines = (circle: Circle, direction: Direction): Line[] => {
  switch (direction.direction) {
    case Direction.DIRECTION_RIGHT: {
      return [
        {
          x1: circle.x,
          y1: circle.y - circle.r,
          x2: circle.x + circle.r,
          y2: circle.y - circle.r,
        },
        {
          x1: circle.x,
          y1: circle.y + circle.r,
          x2: circle.x + circle.r,
          y2: circle.y + circle.r,
        },
      ];
    }

    case Direction.DIRECTION_TOP: {
      return [
        {
          x1: circle.x - circle.r,
          y1: circle.y,
          x2: circle.x - circle.r,
          y2: circle.y + circle.r,
        },
        {
          x1: circle.x + circle.r,
          y1: circle.y,
          x2: circle.x + circle.r,
          y2: circle.y + circle.r,
        },
      ];
    }

    case Direction.DIRECTION_LEFT: {
      return [
        {
          x1: circle.x,
          y1: circle.y - circle.r,
          x2: circle.x - circle.r,
          y2: circle.y - circle.r,
        },
        {
          x1: circle.x,
          y1: circle.y + circle.r,
          x2: circle.x - circle.r,
          y2: circle.y + circle.r,
        },
      ];
    }

    case Direction.DIRECTION_DOWN: {
      return [
        {
          x1: circle.x - circle.r,
          y1: circle.y,
          x2: circle.x - circle.r,
          y2: circle.y - circle.r,
        },
        {
          x1: circle.x + circle.r,
          y1: circle.y,
          x2: circle.x + circle.r,
          y2: circle.y - circle.r,
        },
      ];
    }

    default: {
      throw new Error('Not implemented');
    }
  }
};

export default buildDirectionalLines;
