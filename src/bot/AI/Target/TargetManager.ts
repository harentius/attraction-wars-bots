import GameObject from '../../../storage/GameObject';
import Target from './Target';

class TargetManager {
  public selectTarget(playerData: GameObject, visiblePlayers: GameObject[], visibleAsteroids: GameObject[]): Target {
    const playerR = playerData.r;
    const smallerFilter = (v) => v.r < playerR;

    const closestAbsorbablePlayer = visiblePlayers.find(smallerFilter);
    const closestAbsorbableAsteroid = visibleAsteroids.find(smallerFilter);

    if (!closestAbsorbablePlayer && !closestAbsorbableAsteroid) {
      return new Target(Target.TARGET_POINT, {id: 0, x: 0, y: 0, r: 0});
    }

    if (closestAbsorbablePlayer) {
      return new Target(Target.TARGET_PLAYER, closestAbsorbablePlayer);
    }

    return new Target(Target.TARGET_ASTEROID, closestAbsorbableAsteroid);
  }

  public isTargetObjectExists(
    target: Target,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
  ): boolean {
    let collectionToSearch = null;

    if (target.type === Target.TARGET_PLAYER) {
      collectionToSearch = visiblePlayers;
    }

    if (target.type === Target.TARGET_ASTEROID) {
      collectionToSearch = visibleAsteroids;
    }

    if (!collectionToSearch) {
      return false;
    }

    return !!collectionToSearch.find((v) => v.id === target.gameObject.id);
  }
}

export default TargetManager;
