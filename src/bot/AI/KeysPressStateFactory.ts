import KeysPressState from '../../storage/KeysPressState';
import Direction from './Direction/Direction';

class KeysPressStateFactory {
  public create(direction: Direction): KeysPressState {
    switch (direction.direction) {
      case Direction.DIRECTION_RIGHT: return new KeysPressState({right: true});
      case Direction.DIRECTION_TOP_RIGHT: return new KeysPressState({up: true, right: true});
      case Direction.DIRECTION_TOP: return new KeysPressState({up: true});
      case Direction.DIRECTION_TOP_LEFT: return new KeysPressState({up: true, left: true});
      case Direction.DIRECTION_LEFT: return new KeysPressState({left: true});
      case Direction.DIRECTION_DOWN_LEFT: return new KeysPressState({down: true, left: true});
      case Direction.DIRECTION_DOWN: return new KeysPressState({down: true});
      case Direction.DIRECTION_DOWN_RIGHT: return new KeysPressState({down: true, right: true});
      case undefined: return new KeysPressState();
      default: throw new Error('Not implemented');
    }
  }
}

export default KeysPressStateFactory;
