import BotAI from './BotAI';
import BotAIFactory from './BotAIFactory';

class BotAIManager {
  private readonly botAIFactory: BotAIFactory;
  private readonly tickInterval: number;
  private readonly botManagerInterval: number;
  private readonly minPlayers: number;
  private readonly maxPlayers: number;
  private readonly botAIs: Map<number, BotAI>;

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
    this.botAIs = new Map<number, BotAI>();
    this.init();
  }

  public startLoop(): void {
    setInterval(() => {
      for (const botAI of this.botAIs.values()) {
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
      do {
        this.logoutExtraBot();
      } while (onlineCount >= this.maxPlayers && this.botAIs.size > 0);
    } else if ((onlineCount < this.minPlayers) || Math.random() > 0.1) {
      this.addBotAI();
    }

    for (const botAI of this.botAIs.values()) {
      if (botAI.isTooBig()) {
        console.log(`Bot ${botAI.id} is too big. Logout`);
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
    return this.botAIs.size > 0
      ? this.botAIs.get(this.botAIs.keys().next().value).getWorldData().serverStatistics.onlineCount
      : 0
    ;
  }

  private addBotAI(): void {
    const botAI = this.botAIFactory.create((b) => this.deleteBotAi(b));
    this.botAIs.set(botAI.id, botAI);
  }

  private deleteBotAi(botAI: BotAI): void {
    console.log(`Bot ${botAI.id} disconnected`);
    this.botAIs.delete(botAI.id);
    botAI.clean();
  }

  private logoutExtraBot(): void {
    if (this.botAIs.size === 0) {
      return;
    }

    const key = this.botAIs.keys().next().value;
    console.log(`Logout extra bot. Logout ${key}`);
    this.botAIs.get(key).logout();
    this.botAIs.delete(key);
  }
}

export default BotAIManager;
