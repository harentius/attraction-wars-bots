import Bot from '../Bot';
import Target from './Target/Target';
import TargetManager from './Target/TargetManager';
import DirectionManager from './Direction/DirectionManager';
import Direction from './Direction/Direction';
import KeysPressStateFactory from './KeysPressStateFactory';

class BotAI {
  private readonly bot: Bot;
  private readonly targetManager: TargetManager;
  private directionManager: DirectionManager;
  private target: Target | null;
  private keysPressStateFactory: KeysPressStateFactory;
  private readonly ticksBeforeChangeDirection: number;

  constructor(
    bot: Bot,
    targetManager: TargetManager,
    directionManager: DirectionManager,
    keysPressStateFactory: KeysPressStateFactory,
    ticksBeforeChangeDirection: number,
  ) {
    this.bot = bot;
    this.targetManager = targetManager;
    this.directionManager = directionManager;
    this.keysPressStateFactory = keysPressStateFactory;
    this.ticksBeforeChangeDirection = ticksBeforeChangeDirection;
    this.bot.login();
  }

  public tick(): void {
    const playerData = this.bot.getPlayerData();
    const visiblePlayers = this.bot.getVisiblePlayers();
    const visibleAsteroids = this.bot.getVisibleAsteroids();

    if (this.target && !this.targetManager.isTargetObjectExists(this.target, visiblePlayers, visibleAsteroids)) {
      this.target = null;
    }

    if (!this.target || (this.target.type === Target.TARGET_POINT)) {
      const target = this.targetManager.selectTarget(
        playerData,
        visiblePlayers,
        visibleAsteroids,
        this.bot.getWorldData().worldBounds[2],
        this.bot.getWorldData().worldBounds[3],
      );

      if (!this.target
        || target.type !== Target.TARGET_POINT
        || (this.target.ticksMoved > this.ticksBeforeChangeDirection)
      ) {
        this.target = target;
      }
    }

    this.target.increaseTickMoved();
    const worldData = this.bot.getWorldData();
    const direction = this.directionManager.selectDirection(
      playerData,
      this.target,
      visiblePlayers,
      visibleAsteroids,
      worldData.relativeZonesSizes[2],
      worldData.asteroidAttractionRadiusMultiplier,
    );
    this.move(direction);
  }

  private move(direction: Direction): void {
    const keyPressState = this.keysPressStateFactory.create(direction);
    this.bot.setKeyPressState(keyPressState);
  }
}

export default BotAI;
