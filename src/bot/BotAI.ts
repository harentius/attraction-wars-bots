import Point from '../storage/Point';
import Bot from './Bot';
import Circle from '../storage/Circle';

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
    const visiblePlayers = this.bot.getVisiblePlayers();
    const visibleAsteroids = this.bot.getVisibleAsteroids();

    if (!this.target) {
      this.target = this.chooseTarget(visiblePlayers, visibleAsteroids);
    }
  }

  private chooseTarget(visiblePlayers: Circle[], visibleAsteroids: Circle[]): Point | null {
    const playerR = this.bot.getPlayerData().r;
    const smallerFilter = (v) => v.r < playerR;

    const closestAbsorbablePlayer = visiblePlayers.find(smallerFilter);
    const closestAbsorbableAsteroid = visibleAsteroids.find(smallerFilter);

    if (!closestAbsorbablePlayer && !closestAbsorbableAsteroid) {
      return null;
    }

    if (closestAbsorbablePlayer) {
      return closestAbsorbablePlayer;
    }

    return closestAbsorbableAsteroid;
  }
}

export default BotAI;
