import GameObject from '../../../storage/GameObject';
import Target from '../Target/Target';
import Direction from './Direction';
import calculateAngleToXAxis from '../../../math-utils/calculateAngleToXAxis';
import calculateCirclesDistance from '../../../math-utils/calculateCirclesDistance';
import DangerObjectManager from './DangerObjectManager';

class DirectionManager {
  private readonly minDangerDistance: number;
  private readonly dangerObjectManager: DangerObjectManager;

  public constructor(minDangerDistance: number, dangerObjectManager: DangerObjectManager) {
    this.dangerObjectManager = dangerObjectManager;
    this.minDangerDistance = minDangerDistance;
  }

  public selectDirection(
    playerData: GameObject,
    target: Target,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
    playersInfluenceMultiplier: number,
    asteroidsInfluenceMultiplier: number,
  ): Direction {
    const targetAngle = calculateAngleToXAxis(playerData, target.gameObject);
    const dangerObject = this.dangerObjectManager.getDangerObject(
      playerData,
      visiblePlayers,
      visibleAsteroids,
      playersInfluenceMultiplier,
      asteroidsInfluenceMultiplier,
    );

    if (!dangerObject || calculateCirclesDistance(playerData, dangerObject) > this.minDangerDistance) {
      return new Direction(targetAngle);
    }

    return this.dangerObjectManager.selectMostOptimalDirection(playerData, targetAngle, dangerObject);
  }
}

export default DirectionManager;
