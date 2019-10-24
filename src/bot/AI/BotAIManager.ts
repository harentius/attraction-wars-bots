import BotAI from './BotAI';
import BotAIFactory from './BotAIFactory';
import randomInt from '../../utils/randomInt';

class BotAIManager {
  private readonly botAIFactory: BotAIFactory;
  private readonly tickInterval: number;
  private readonly botManagerInterval: number;
  private readonly minPlayers: number;
  private readonly maxPlayers: number;
  private botAIs: BotAI[];

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
    if (this.botAIs.length > this.maxPlayers) {
      this.deleteRandomBotAI();
    } else if ((this.botAIs.length < this.minPlayers) || Math.random() > 0.9) {
      this.addBotAI();
    }

    for (const botAI of this.botAIs) {
      if (botAI.isTooBig()) {
        this.deleteBotAi(botAI);
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

  private addBotAI(): void {
    const botAI = this.botAIFactory.create(() => this.deleteBotAi(botAI));
    this.botAIs.push(botAI);
  }

  private deleteBotAi(botAI): void {
    const botIndex = this.botAIs.findIndex((v) => botAI.uid() === v.uid());
    this.botAIs.splice(botIndex, 1);
  }

  private deleteRandomBotAI(): void {
    const index = randomInt(0, this.botAIs.length - 1);
    this.deleteBotAi(this.botAIs[index]);
  }
}

export default BotAIManager;
