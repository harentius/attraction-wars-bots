import Line from '../../../math-utils/types/Line';
import Circle from '../../../math-utils/types/Circle';
import Direction from './Direction';

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

    case Direction.DIRECTION_TOP_RIGHT: {
      return [
        {
          x1: circle.x + circle.r * Math.cos(Math.PI / 4),
          y1: circle.y - circle.r * Math.sin(Math.PI / 4),
          x2: circle.x + circle.r * Math.sqrt(2),
          y2: circle.y,
        },
        {
          x1: circle.x - circle.r * Math.cos(Math.PI / 4),
          y1: circle.y + circle.r * Math.sin(Math.PI / 4),
          x2: circle.x,
          y2: circle.y + circle.r * Math.sqrt(2),
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

    case Direction.DIRECTION_TOP_LEFT: {
      return [
        {
          x1: circle.x - circle.r * Math.sin(Math.PI / 4),
          y1: circle.y - circle.r * Math.cos(Math.PI / 4),
          x2: circle.x - circle.r * Math.sqrt(2),
          y2: circle.y,
        },
        {
          x1: circle.x + circle.r * Math.sin(Math.PI / 4),
          y1: circle.y + circle.r * Math.cos(Math.PI / 4),
          x2: circle.x,
          y2: circle.y + circle.r * Math.sqrt(2),
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

    case Direction.DIRECTION_DOWN_LEFT: {
      return [
        {
          x1: circle.x + circle.r * Math.sin(Math.PI / 4),
          y1: circle.y - circle.r * Math.cos(Math.PI / 4),
          x2: circle.x,
          y2: circle.y - circle.r * Math.sqrt(2),
        },
        {
          x1: circle.x - circle.r * Math.sin(Math.PI / 4),
          y1: circle.y + circle.r * Math.cos(Math.PI / 4),
          x2: circle.x - circle.r * Math.sqrt(2),
          y2: circle.y,
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

    case Direction.DIRECTION_DOWN_RIGHT: {
      return [
        {
          x1: circle.x - circle.r * Math.sin(Math.PI / 4),
          y1: circle.y - circle.r * Math.cos(Math.PI / 4),
          x2: circle.x,
          y2: circle.y - circle.r * Math.sqrt(2),
        },
        {
          x1: circle.x + circle.r * Math.sin(Math.PI / 4),
          y1: circle.y + circle.r * Math.cos(Math.PI / 4),
          x2: circle.x + circle.r * Math.sqrt(2),
          y2: circle.y,
        },
      ];
    }

    default: {
      throw new Error('Not implemented');
    }
  }
};

export default buildDirectionalLines;
