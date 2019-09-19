import Bot from './Bot';
import Target from './AI/Target/Target';
import GameObject from '../storage/GameObject';
import calculateDistance from '../utils/calculateDistance';
import config from '../config';
import Circle from '../storage/Circle';

class BotAI {
  private readonly bot: Bot;
  private target: Target | null;
  private avoid;

  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.login();
    this.avoid = false;
  }

  public tick(): void {
    const playerData = this.bot.getPlayerData();
    const visiblePlayers = this.bot.getVisiblePlayers();
    const visibleAsteroids = this.bot.getVisibleAsteroids();

    if (!this.target || this.target.type === Target.TARGET_POINT) {
      this.target = this.selectTarget(playerData, visiblePlayers, visibleAsteroids);
    }

    if (this.avoidDangerObjects(playerData, visiblePlayers, visibleAsteroids)) {
      return;
    }

    this.target = this.moveToTarget(this.target, playerData, visiblePlayers, visibleAsteroids);
  }

  private selectTarget(playerData: GameObject, visiblePlayers: GameObject[], visibleAsteroids: GameObject[]): Target {
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

  private moveToTarget(
    target: Target,
    playerData: GameObject,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
  ): Target | null {
    const dx = target.gameObject.x - playerData.x;
    const dy = target.gameObject.y - playerData.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      this.moveToTargetX(target, playerData);
    } else {
      this.moveToTargetY(target, playerData);
    }

    if (!this.isTargetObjectStillExists(target, visiblePlayers, visibleAsteroids)) {
      return null;
    }

    return target;
  }

  private moveToTargetX(target: Target, playerData: GameObject): void {
    const dx = target.gameObject.x - playerData.x;

    if (dx > 0) {
      this.bot.moveRight();
    } else {
      this.bot.moveLeft();
    }
  }

  private moveToTargetY(target: Target, playerData: GameObject): void {
    const dy = target.gameObject.y - playerData.y;

    if (dy > 0) {
      this.bot.moveDown();
    } else {
      this.bot.moveUp();
    }
  }

  private avoidDangerObjects(
    playerData: GameObject,
    visiblePlayers: GameObject[],
    visibleAsteroids: GameObject[],
  ): boolean {
    const worldData = this.bot.getWorldData();
    const playerR = playerData.r;
    const biggerFilter = (v) => v.r >= playerR;

    const closestBiggerPlayer = visiblePlayers.find(biggerFilter);
    const closestBiggerAsteroid = visibleAsteroids.find(biggerFilter);
    // TODO
    const getDistanceToPlayerZone = () => {

    };
    const getDistanceToAsteroidZone = (player: Circle, asteroid: Circle) => {
      const r = asteroid.r * worldData.asteroidAttractionRadiusMultiplier;

      return calculateDistance(player, {x: asteroid.x, y: asteroid.y, r});
    };

    // if (closestBiggerPlayer) {
    //
    //
    //   if (
    //     !closestBiggerAsteroid
    //       ||
    //     calculateDistance(closestBiggerAsteroid, playerData) > calculateDistance(closestBiggerPlayer, playerData)
    //   ) {
    //
    //   }
    // }
// if (this.avoid) {
//   return true;
// }
    if (closestBiggerAsteroid) {
      const xRDistance = calculateDistance(
        {x: playerData.x, y: 0, r: playerData.r},
        {x: closestBiggerAsteroid.x, y: 0, r: closestBiggerAsteroid.r},
      );
      const yRDistance = calculateDistance(
        {x: 0, y: playerData.y, r: playerData.r},
        {x: 0, y: closestBiggerAsteroid.y, r: closestBiggerAsteroid.r},
      );
      const distance = getDistanceToAsteroidZone(
        {x: playerData.x, y: playerData.y, r: playerData.r},
        {x: closestBiggerAsteroid.x, y: closestBiggerAsteroid.y, r: closestBiggerAsteroid.r},
      );

      if (distance <= config.maxDangerDistance) {
        this.bot.stop();

        if (xRDistance > yRDistance) {
          this.moveToTargetY(this.target, playerData);
        } else {
          this.moveToTargetX(this.target, playerData);
        }

        return true;
      }
    }
  }

  private isTargetObjectStillExists(
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

export default BotAI;
