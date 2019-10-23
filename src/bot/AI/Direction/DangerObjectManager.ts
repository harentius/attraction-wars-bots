import GameObject from '../../../storage/GameObject';

class DangerObjectManager {
  private readonly minDistanceToDangerObject: number;

  public constructor(minDistanceToDangerObject: number) {
    this.minDistanceToDangerObject = minDistanceToDangerObject;
  }

  public getDangerObject(
    playerData: GameObject,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
    playersInfluenceMultiplier: number,
    asteroidsInfluenceMultiplier: number,
  ): GameObject {
    const dangerPlayer = visiblePlayers
      .find((p) => p.r >= playerData.r)
    ;
    const dangerAsteroid = visibleAsteroids
      .find((a) => a.r >= playerData.r)
    ;

    if (dangerPlayer && dangerAsteroid) {
      return dangerPlayer.r > dangerAsteroid.r
        ? {...dangerPlayer, r: dangerPlayer.r * playersInfluenceMultiplier}
        : {...dangerAsteroid, r: dangerAsteroid.r * asteroidsInfluenceMultiplier};
    }

    if (dangerAsteroid) {
      return {...dangerAsteroid, r: dangerAsteroid.r * asteroidsInfluenceMultiplier + this.minDistanceToDangerObject};
    }

    if (dangerPlayer) {
      return {...dangerPlayer, r: dangerPlayer.r * playersInfluenceMultiplier + this.minDistanceToDangerObject};
    }

    return null;
  }
}

export default DangerObjectManager;
