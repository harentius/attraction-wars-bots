import Bot from './Bot';
import Target from './Target';
import GameObject from '../storage/GameObject';

class BotAI {
  private readonly bot: Bot;
  private target: Target | null;

  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.login();
  }

  public tick(): void {
    const visiblePlayers = this.bot.getVisiblePlayers();
    const visibleAsteroids = this.bot.getVisibleAsteroids();

    if (!this.target) {
      this.target = this.chooseTarget(visiblePlayers, visibleAsteroids);
    }

    this.target = this.moveToTarget(this.target, visiblePlayers, visibleAsteroids);
  }

  private chooseTarget(visiblePlayers: GameObject[], visibleAsteroids: GameObject[]): Target {
    const playerR = this.bot.getPlayerData().r;
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

  private moveToTarget(target: Target, visiblePlayers: GameObject[], visibleAsteroids: GameObject[]): Target | null {
    const playerData = this.bot.getPlayerData();
    const dx = target.gameObject.x - playerData.x;
    const dy = target.gameObject.y - playerData.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        this.bot.moveRight();
      } else {
        this.bot.moveLeft();
      }
    } else {
      if (dy > 0) {
        this.bot.moveDown();
      } else {
        this.bot.moveUp();
      }
    }

    if (!this.isTargetObjectStillExists(target, visiblePlayers, visibleAsteroids)) {
      return null;
    }

    return target;
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
