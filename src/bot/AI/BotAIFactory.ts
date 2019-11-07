import * as faker from 'faker';
import { Storage, Client } from 'attraction-wars-client-storage';
import Bot from '../Bot';
import BotAI from './BotAI';
import TargetManager from './Target/TargetManager';
import DirectionManager from './Direction/DirectionManager';
import KeysPressStateFactory from './KeysPressStateFactory';

class BotAIFactory {
  private readonly targetManager: TargetManager;
  private readonly directionManager: DirectionManager;
  private readonly keyPressStateFactory: KeysPressStateFactory;
  private readonly serverUrl: string;
  private readonly visibilityRadius: number;
  private readonly ticksBeforeChangeDirection: number;
  private readonly tooBigMultiplier: number;
  private borderMarginRadiusMultiplier: number;

  constructor(
    targetManager: TargetManager,
    directionManager: DirectionManager,
    keyPressStateFactory: KeysPressStateFactory,
    serverUrl: string,
    visibilityRadius: number,
    ticksBeforeChangeDirection: number,
    tooBigMultiplier: number,
    borderMarginRadiusMultiplier: number,
  ) {
    this.targetManager = targetManager;
    this.directionManager = directionManager;
    this.keyPressStateFactory = keyPressStateFactory;
    this.serverUrl = serverUrl;
    this.visibilityRadius = visibilityRadius;
    this.ticksBeforeChangeDirection = ticksBeforeChangeDirection;
    this.tooBigMultiplier = tooBigMultiplier;
    this.borderMarginRadiusMultiplier = borderMarginRadiusMultiplier;
  }

  public create(afterRefresh: (b: BotAI) => void): BotAI {
    const storage = new Storage();
    const client = new Client(storage, this.serverUrl);
    const bot = new Bot(this.generateUsername(), client, storage, this.visibilityRadius);
    const botAi = new BotAI(
      bot,
      this.targetManager,
      this.directionManager,
      this.keyPressStateFactory,
      this.ticksBeforeChangeDirection,
      this.tooBigMultiplier,
      this.borderMarginRadiusMultiplier,
    );

    storage.on(Storage.AFTER_REFRESH, () => afterRefresh(botAi));

    return botAi;
  }

  private generateUsername(): string {
    return !!faker.random.number(1)
      ? faker.internet.domainWord()
      : faker.name.firstName()
    ;
  }
}

export default BotAIFactory;
