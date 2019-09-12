import Point from '../Point';
import Bot from './Bot';

class BotAI {
  private readonly bot: Bot;
  private target: Point | null;

  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.login();
  }

  public moveTo(target: Point): void {
    this.target = target;
  }

  public tick(): void {
    if (!this.target) {
      //  TODO: choose target
    }
  }
}

export default BotAI;
