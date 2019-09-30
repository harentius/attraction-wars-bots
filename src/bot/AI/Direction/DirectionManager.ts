import GameObject from '../../../storage/GameObject';
import Target from '../Target/Target';
import Direction from './Direction';
import calculateAngleToXAxis from '../../../math-utils/calculateAngleToXAxis';
import calculateCirclesDistance from '../../../math-utils/calculateCirclesDistance';
import buildDirectionalLines from './buildDirectionalLines';
import isCircleAndLineIntersect from '../../../math-utils/isCircleAndLineIntersect';

class DirectionManager {
  private readonly minDangerDistance: number;
  private readonly visibilityRadius: number;

  public constructor(minDangerDistance: number, visibilityRadius: number) {
    this.minDangerDistance = minDangerDistance;
    this.visibilityRadius = visibilityRadius;
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
    const dangerObject = this.getDangerObject(
      playerData,
      visiblePlayers,
      visibleAsteroids,
      playersInfluenceMultiplier,
      asteroidsInfluenceMultiplier,
    );

    if (!dangerObject || calculateCirclesDistance(playerData, dangerObject) > this.minDangerDistance) {
      return new Direction(targetAngle);
    }

    return this.selectMostOptimalDirection(playerData, targetAngle, dangerObject);
  }

  // TODO: may be this should not be private methods
  private selectMostOptimalDirection(
    playerData: GameObject,
    targetAngle: number,
    dangerObject: GameObject,
  ): Direction {
    const movementDirections = [];

    for (const direction of Direction.getPossibleDirections()) {
      const lines = buildDirectionalLines(playerData, direction, this.visibilityRadius);

      if (!isCircleAndLineIntersect(dangerObject, lines[0]) && !isCircleAndLineIntersect(dangerObject, lines[1])) {
        movementDirections.push(direction);
      }
    }

    const sortedDirections = movementDirections
      .sort((v1, v2) => Math.abs(v1 - targetAngle) > Math.abs(v2 - targetAngle) ? 1 : -1)
    ;

    return new Direction(sortedDirections[0]);
  }

  private getDangerObject(
    playerData: GameObject,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
    playersInfluenceMultiplier: number,
    asteroidsInfluenceMultiplier: number,
  ): GameObject {
    const dangerPlayer = visiblePlayers
      .find((p) => p.r > playerData.r)
    ;
    const dangerAsteroid = visibleAsteroids
      .find((a) => a.r > playerData.r)
    ;

    if (dangerPlayer && dangerAsteroid) {
      return dangerPlayer.r > dangerAsteroid.r
        ? {...dangerPlayer, r: dangerPlayer.r * playersInfluenceMultiplier}
        : {...dangerAsteroid, r: dangerAsteroid.r * asteroidsInfluenceMultiplier};
    }

    if (dangerAsteroid) {
      return {...dangerAsteroid, r: dangerAsteroid.r * asteroidsInfluenceMultiplier};
    }

    if (dangerPlayer) {
      return {...dangerPlayer, r: dangerPlayer.r * playersInfluenceMultiplier};
    }

    return null;
  }
}

export default DirectionManager;
