import GameObject from '../../../storage/GameObject';
import Target from '../Target/Target';
import Direction from './Direction';

class DirectionManager {
  private minDangerDistance: number;

  public constructor(minDangerDistance: number) {
    this.minDangerDistance = minDangerDistance;
  }

  public selectDirection(
    playerData: GameObject,
    target: Target,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
  ): Direction {
    return new Direction();
  }
}

export default DirectionManager;
