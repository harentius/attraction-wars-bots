import BotAI from './BotAI';
import BotAIFactory from './BotAIFactory';
import randomInt from '../../utils/randomInt';

class BotAIManager {
  private readonly botAIFactory: BotAIFactory;
  private readonly tickInterval: number;
  private readonly botManagerInterval: number;
  private readonly minPlayers: number;
  private readonly maxPlayers: number;
  private readonly botAIs: BotAI[];

  constructor(
    botAIFactory: BotAIFactory,
    tickInterval: number,
    botManagerInterval: number,
    minPlayers: number,
    maxPlayers: number,
  ) {
    this.botAIFactory = botAIFactory;
    this.tickInterval = tickInterval;
    this.botManagerInterval = botManagerInterval;
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.botAIs = [];
    this.init();
  }

  public startLoop(): void {
    setInterval(() => {
      for (const botAI of this.botAIs) {
        botAI.tick();
      }
    }, this.tickInterval);

    setInterval(() => {
      this.update();
    }, this.botManagerInterval);
  }

  private update(): void {
    const onlineCount = this.getOnlineCount();

    if (onlineCount >= this.maxPlayers) {
      this.logoutRandomBot();
    } else if ((onlineCount < this.minPlayers) || Math.random() > 0.1) {
      this.addBotAI();
    }

    for (const botAI of this.botAIs) {
      if (botAI.isTooBig()) {
        botAI.logout();
        return;
      }
    }
  }

  private init(): void {
    const n = this.minPlayers + Math.ceil((this.maxPlayers - this.minPlayers) / 2);

    for (let i = 0; i < n; i++) {
      this.addBotAI();
    }
  }

  private getOnlineCount(): number {
    return this.botAIs.length > 0
      ? this.botAIs[0].getWorldData().serverStatistics.onlineCount
      : 0
    ;
  }

  private addBotAI(): void {
    const botAI = this.botAIFactory.create();
    this.botAIs.push(botAI);
  }

  private logoutRandomBot(): void {
    if (this.botAIs.length === 0) {
      return;
    }

    const index = randomInt(0, this.botAIs.length - 1);
    this.botAIs[index].logout();
    this.botAIs.splice(index, 1);
  }
}

export default BotAIManager;
