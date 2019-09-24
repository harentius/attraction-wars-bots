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

  constructor(
    bot: Bot,
    targetManager: TargetManager,
    directionManager: DirectionManager,
    keysPressStateFactory: KeysPressStateFactory,
  ) {
    this.bot = bot;
    this.targetManager = targetManager;
    this.directionManager = directionManager;
    this.keysPressStateFactory = keysPressStateFactory;
    this.bot.login();
  }

  public tick(): void {
    const playerData = this.bot.getPlayerData();
    const visiblePlayers = this.bot.getVisiblePlayers();
    const visibleAsteroids = this.bot.getVisibleAsteroids();

    if (this.target && !this.targetManager.isTargetObjectExists(this.target, visiblePlayers, visibleAsteroids)) {
      this.target = null;
    }

    if (!this.target || this.target.type === Target.TARGET_POINT) {
      this.target = this.targetManager.selectTarget(playerData, visiblePlayers, visibleAsteroids);
    }

    const direction = this.directionManager.selectDirection(playerData, this.target, visiblePlayers, visibleAsteroids);
    this.move(direction);
  }

  private move(direction: Direction): void {
    const keyPressState = this.keysPressStateFactory.create(direction);
    this.bot.setKeyPressState(keyPressState);
  }
}

export default BotAI;
