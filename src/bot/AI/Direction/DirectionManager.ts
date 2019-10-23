import GameObject from '../../../storage/GameObject';
import Target from '../Target/Target';
import Direction from './Direction';
import DangerObjectManager from './DangerObjectManager';
import isCirclesIntersect from '../../../math-utils/isCirclesIntersect';
import getAngle from '../../../math-utils/getAngle';
import random from '../../../utils/random';

class DirectionManager {
  private readonly dangerObjectManager: DangerObjectManager;
  private readonly visibilityRadius: number;

  public constructor(
    visibilityRadius: number,
    dangerObjectManager: DangerObjectManager,
  ) {
    this.visibilityRadius = visibilityRadius;
    this.dangerObjectManager = dangerObjectManager;
  }

  public selectDirection(
    playerData: GameObject,
    target: Target,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
    playersInfluenceMultiplier: number,
    asteroidsInfluenceMultiplier: number,
  ): Direction {
    const targetAngle = getAngle(playerData, target.gameObject);

    const dangerObject = this.dangerObjectManager.getDangerObject(
      playerData,
      visiblePlayers,
      visibleAsteroids,
      playersInfluenceMultiplier,
      asteroidsInfluenceMultiplier,
    );

    const direction = new Direction(targetAngle);

    if (!dangerObject || !isCirclesIntersect(playerData, dangerObject) ) {
      return direction;
    }

    const shift = Math.PI + random(-Math.PI / 2, Math.PI / 2);
    const angle = (Math.atan2(dangerObject.y - playerData.y, dangerObject.x - playerData.x) + shift) % (2 * Math.PI);

    return new Direction(angle);
  }
}

export default DirectionManager;
