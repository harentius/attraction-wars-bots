import BotAI from './BotAI';
import BotAIFactory from './BotAIFactory';

class BotAIManager {
  private readonly botAiFactory: BotAIFactory;
  private readonly tickInterval: number;
  private readonly minPlayers: number;
  private readonly maxPlayers: number;
  private botAIs: BotAI[];

  constructor(
    botAiFactory: BotAIFactory,
    tickInterval: number,
    minPlayers: number,
    maxPlayers: number,
  ) {
    this.botAiFactory = botAiFactory;
    this.tickInterval = tickInterval;
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.botAIs = [];
    this.init();
  }

  public startLoop() {
    setInterval(() => {
      for (const botAI of this.botAIs) {
        botAI.tick();
      }
    }, this.tickInterval);
  }

  private update() {

  }

  private init() {
    const n = 40;

    for (let i = 0; i < n; i++) {
      const botAI = this.botAiFactory.create(() => {
        const botIndex = this.botAIs.findIndex((v) => botAI.uid() === v.uid());
        this.botAIs.splice(botIndex, 1);
      });
      this.botAIs.push(botAI);
    }
  }
}

export default BotAIManager;
